const esbuild = require('esbuild')
const process = require('process')

const argv = process.argv.slice(2)
const argm = {}
argv.forEach((arg) => argm[arg] = true)

const watch = argm['-w'] || false

const backendConfig = {
  entryPoints: ['src/main.tsx'],
  platform: 'node',
}
const frontendConfig = {
  entryPoints: ['src/index.tsx'],
  platform: 'browser',
}
const defaultConfig = {
  watch,
  bundle: true,
  minify: true,
  sourcemap: false,
  outdir: 'dist',
  tsconfig: 'tsconfig.json',
}

esbuild.build({ ...defaultConfig, ...backendConfig })
esbuild.build({ ...defaultConfig, ...frontendConfig })
