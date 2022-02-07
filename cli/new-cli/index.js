const fs = require('fs/promises')

module.exports = {
  name: 'create new cli command',
  flag: '-c --cli <filename>',
  event: 'cli',
  async exec(filename) {
    console.log('holy crap', filename)

    const path = `./cli/${filename}`
    await fs.readdir(path).catch((err) => {
      return fs.mkdir(path)
    })
    await fs.writeFile(`${path}/index.js`, `module.exports = {
  name: '${filename}',
  flag: '--${filename} <argument>',
  event: '${filename}',
  async exec() {},
}
`, 'utf8')
  },
}
