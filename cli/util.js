const fs = require('fs/promises')
const { execSync } = require('child_process')
const path = require('path')

async function yarnAdd(...packages) {
  return execSync(`yarn add ${packages.join(' ')}`)
}
async function yarnRemove(...packages) {
  return execSync(`yarn remove ${packages.join(' ')}`)
}

async function fileReplace(fromPath, toPath) {
  fromPath = path.resolve(fromPath)
  toPath = path.resolve(toPath)

  return fs.copyFile(fromPath, toPath)
}
async function dirRemove(fromPath) {
  fromPath = path.resolve(fromPath)

  return fs.rmdir(fromPath, { recursive: true })
}

module.exports = {
  yarnAdd,
  yarnRemove,
  fileReplace,
  dirRemove,
}
