const esbuild = require('esbuild')
const process = require('process')
const dotenv = require('dotenv')

const argv = process.argv.slice(2)
const argm = {}
argv.forEach((arg) => argm[arg] = true)

const watch = (argm['-w'] || false)

const originEnv = { ...process.env }
const dotenv = require('dotenv')
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
  entryPoints: ['src/main.tsx'],
  platform: 'node',
}
const frontendConfig = {
  entryPoints: ['src/index.tsx'],
  platform: 'browser',

  plugins: [
    require('esbuild-postcss')(),
  ],
}
const defaultConfig = {
  watch: watch && {
    onRebuild() {
      console.log(`rebuild ${new Date}`)
    },
  },
  bundle: true,
  minify: true,
  sourcemap: watch,
  outdir: 'dist',
  tsconfig: 'tsconfig.json',

  define,
}

esbuild.build({ ...defaultConfig, ...backendConfig })
esbuild.build({ ...defaultConfig, ...frontendConfig })
