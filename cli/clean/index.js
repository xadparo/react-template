const { dirRemove, gitCommit } = require('../util')

module.exports = {
  name: 'clean',
  flag: '--clean',
  event: 'clean',
  async exec() {
    await dirRemove('./cli')
    gitCommit('chore: cleaned up cli')
  },
}
