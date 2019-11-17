'use strict'

const dedent = require('dedent')
const yargs = require('yargs/yargs')
const log = require('npmlog')

const globalOptions = require('../global-options')

// Type Definitions
/***
 * Config Object
 * @typedef {Object} Config
 * @property {string} cliName Name of cli (used in logs)
 *
 * @example
 * const config = { cliName: "myCli" }
 */

/***
 * cli module entrypoint
 * @param {Config} config The {@link Config} object
 * @returns {function} Returns a cli function
 * @example
 * const myCli = new Cli(config)
 */
module.exports = function cliFactory (config) {
  const { cliName } = config

  // TODO: validate `cliName` exists; not greater than 5 characters

  /**
   * A factory that returns a yargs() instance configured  with everything
   * except commands. Chain .parse() from this method to invoke.
   *
   * @param {Array = []} argv
   * @param {String = process.cwd()} cwd
   */
  return function Cli (argv, cwd) {
    const cli = yargs(argv, cwd)

    return globalOptions(cli)
      .usage('Usage: $0 <command> [options]')
      .demandCommand(1, 'A command is required. Pass --help to see all available commands and options.')
      .recommendCommands()
      .strict()
      .fail((msg, err) => {
      // INFO: certain yargs validations throw strings
        const actual = err || new Error(msg)

        // INFO: ValidationErrors are already logged, as are package errors
        if (actual.name !== 'ValidationError' && !actual.pkg) {
        // the recommendCommands() message is too terse
          if (/Did you mean/.test(actual.message)) {
            log.error(cliName, `Unknown command "${cli.parsed.argv._[0]}"`)
          }

          log.error(cliName, actual.message)
        }

        // exit non-zero so the CLI can be usefully chained
        cli.exit(actual.code > 0 ? actual.code : 1, actual)
      })
      .alias('h', 'help')
      .alias('v', 'version')
      .wrap(cli.terminalWidth()).epilogue(dedent`
        When a command fails, all logs are written to cli-debug.log in the current working directory.
        For more information, find the manual at https://github.com/mikemimik/cli
      `)
  }
}
