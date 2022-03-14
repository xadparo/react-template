const { yarnAdd, fileReplace } = require('../util')

module.exports = {
  name: 'Installaion sokcet.io',
  flag: '--sockio',
  event: 'sockio',
  async exec() {
    yarnAdd('socket.io')
    fileReplace(
      './cli/sockio/server/index.ts',
      './src/server/index.ts',
    )
  },
}
