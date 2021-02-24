const Module = require('module')
const fs = require('fs')

Module._extensions['.js'] = function (module, filename) {
  if (filename.includes('lit-html')) {
    console.info('(Test override): Allow Exception from nodejs v13 to run unit test.', filename)
  }

  // eslint-disable-next-line no-sync
  const content = fs.readFileSync(filename, 'utf8')
  module._compile(content, filename)
}

process.on('unhandledRejection', (reason) => {
  console.warn('Warning: unhandledRejection - reason:', reason)
  process.exit(1)
})

