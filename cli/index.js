const { Command } = require('commander')
const fs = require('fs/promises')

async function cli() {
  const program = new Command()

  const files = await fs.readdir(__dirname)
  const installations = files
    .map((fileLike) => {
      try {
        return require('./' + fileLike)
      } catch (err) {
        return err
      }
    })
    .filter((fileLike) => fileLike.exec !== void 0)

  installations.forEach((installation) => {
    program.option(installation.flag, installation.name)
  })

  const opts = program.parse().opts()

  if (Object.keys(opts).length === 0) {
    program.help()
  } else {
    for (const idx in installations) {
      const installation = installations[idx]
      const args = opts[installation.event]

      if (args) {
        console.log(`[INFO] Start ${installation.name}...`)
        await installation.exec(args)
        console.log(`[INFO] Done, ${installation.name}`)
      }
    }
  }
}
cli()
