// task Application
// by Rafi Khan

// Require Modules

// Parse Arguments
task = require('./task.js')
var ArgumentParser = require('argparse').ArgumentParser;

var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'intuitive task management'
})

parser.addArgument (
    [ '-a', '--add'],
    {
        help: 'adds task',
        nargs: 1
    }
)

var args = parser.parseArgs()

// Tasks
if (args.add !== null) {
    console.log("Add task")
        arg = args.add
    if (arg.length == 1){
        console.log("name: " + arg[0])
    }

    else {
        error('task name not specified')
    }
}

// Helper
var error = function(msg) {
    console.log("error encountered: " + msg)
}
