const esbuild = require('esbuild')
const process = require('process')
const dotenv = require('dotenv')
const childprocess = require('child_process')
const path = require('path')

const argv = process.argv.slice(2)
const argm = {}
argv.forEach((arg) => argm[arg] = true)

const watch = (argm['-w'] || false)

const originEnv = { ...process.env }
dotenv.config()
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const define = {}

for (const key in process.env) {
  if (originEnv[key]) {
    continue
  }
  define[`process.env.${key}`] = JSON.stringify(process.env[key] || '')
}

const backendProcessManager = {
  child: null,
  endChild() {
    this.child?.kill()
    this.child = null
  },
  startChild() {
    this.endChild()

    const child = this.child = childprocess.spawn('node', ['dist/main'])
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    console.log(`[Builder] Server (re)start ${new Date}`)
  },
}

const backendConfig = {
  watch: watch && {
    onRebuild(err, result) {
      console.log(`[Builder] BE Rebuild ${new Date}`)
      backendProcessManager.startChild()
    },
  },
  entryPoints: ['src/main.tsx'],
  platform: 'node',
}
const frontendConfig = {
  watch: watch && {
    onRebuild(err, result) {
      console.log(`[Builder] FE Rebuild ${new Date}`)
    },
  },
  entryPoints: ['src/index.tsx'],
  platform: 'browser',

  plugins: [
    require('esbuild-postcss')(),
  ],
  inject: [
    path.join(__dirname, './src/shim/index.ts'),
    path.join(__dirname, './src/shim/index.d.ts'),
  ],
}
const defaultConfig = {
  bundle: true,
  minify: true,
  sourcemap: watch,
  outdir: 'dist',
  tsconfig: 'tsconfig.json',

  define,
}

esbuild.build({ ...defaultConfig, ...backendConfig })
esbuild.build({ ...defaultConfig, ...frontendConfig })

if (watch) {
  backendProcessManager.startChild()
}
