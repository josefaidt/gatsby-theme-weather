const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

exports.onPreBootstrap = ({ store, reporter }) => {
  const { program } = store.getState()

  const envFile = path.join(program.directory, '.env')
  // const dirs = [path.join(program.directory, 'src/pages')]

  // dirs.forEach(dir => {
  //   if (!fs.existsSync(dir)) {
  //     reporter.info(`${dir} directory does not exist, creating...`)
  //     mkdirp.sync(dir)
  //   }
  // })

  if (!fs.existsSync(envFile)) {
    reporter.info(`.ENV file does not exist, creating...`)
    fs.writeFile(envFile, 'API_KEY=your-key-here', err => {
      if (err) throw new Error(err)
      reporter.info(`Successfully created environment file`)
    })
  }
}
