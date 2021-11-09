const esbuild = require('esbuild')
const process = require('process')
const dotenv = require('dotenv')

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

const backendConfig = {
  watch: watch && {
    onRebuild() {
      console.log(`backend rebuild ${new Date}`)
    },
  },
  entryPoints: ['src/main.tsx'],
  platform: 'node',
}
const frontendConfig = {
  watch: watch && {
    onRebuild() {
      console.log(`frontend rebuild ${new Date}`)
    },
  },
  entryPoints: ['src/index.tsx'],
  platform: 'browser',

  plugins: [
    require('esbuild-postcss')(),
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
