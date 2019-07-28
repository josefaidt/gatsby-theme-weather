const path = require('path')
const fs = require('fs')
// const mkdirp = require('mkdirp')

exports.onPreBootstrap = ({ store, reporter }) => {
  const { program } = store.getState()

  const envFile = path.join(program.directory, '.env.development')
  // const dirs = [path.join(program.directory, 'src/pages')]

  // dirs.forEach(dir => {
  //   if (!fs.existsSync(dir)) {
  //     reporter.info(`${dir} directory does not exist, creating...`)
  //     mkdirp.sync(dir)
  //   }
  // })

  if (!fs.existsSync(envFile) && process.env.NODE_ENV === 'development') {
    reporter.warn(`ENV file does not exist, creating...`)
    fs.writeFile(envFile, 'API_KEY=your-key-here', err => {
      if (err) throw new Error(err)
      reporter.info(`successfully created ENV file`)
      reporter.panic(
        `DarkSky API key is required to retrieve data\nSign up for a free API key: https://darksky.net/dev\n`,
        new Error('Missing API Key')
      )
    })
  }
}

exports.onPostBootstrap = ({ store, reporter }) => {}
