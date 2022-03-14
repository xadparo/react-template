const { dirRemove } = require('../util')

module.exports = {
  name: 'clean',
  flag: '--clean',
  event: 'clean',
  async exec() {
    dirRemove('./cli')
  },
}
