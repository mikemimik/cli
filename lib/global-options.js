'use strict'

const os = require('os')

module.exports = globalOptions

function globalOptions (yargs) {
  /**
   * The global options applicable to _every_ command
   */
  const opts = {
    loglevel: {
      defaultDescription: 'info',
      describe: 'What level of logs to report.',
      type: 'string'
    },
    concurrency: {
      defaultDescription: os.cpus().length,
      describe: 'How many processes to use when nops parallelizes tasks.',
      type: 'number',
      requiresArg: true
    },
    'no-progress': {
      describe: 'Disable progress bars. (Always off in CI)',
      type: 'boolean'
    },
    progress: {
      // INFO: proxy for --no-progress
      hidden: true,
      type: 'boolean'
    }
  }

  // INFO: Group options under "Global Options:" header
  const globalKeys = Object.keys(opts).concat(['help', 'version'])

  return yargs
    .options(opts)
    .group(globalKeys, 'Global Options:')
    .options('ci', {
      hidden: true,
      type: 'boolean'
    })
}
