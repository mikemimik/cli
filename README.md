# cli
Core boilerplate for cli projects

## Description
This project will allow the fast iteration on other cli projects. It's meant
to be used with the [mikemimik/command](https://github.com/mikemimik/command)
project. This allows for extendable cli's to be created for whatever needs
there may be.

## Installation
In your project, run the following command to get the latest version of the
module:

```
npm install @mikemimik/cli@latest
```


## Usage
```javascript
// index.js

'use strict'

const Cli = require('@mikemimik/cli')

// NOTE: exported class of `@mikemimik/command`
const someCmd = require('./commands/some-command')

const pkg = require('./package.json')

const cli = new Cli(config)

module.exports = main

function main (argv) {
  const context = {
    cliVersion: pkg.version
  }

  return cli()
    .command(someCmd)
    .parse(argv, context)
}

```

## Configuration
### new Cli(config)

* `config`: configuration object with is passed into factory to generate cli function
  * `config.cliName`: short name of cli, used when logging to the terminal
