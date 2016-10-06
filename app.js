// task Application
// by Rafi Khan

// Require Modules
task = require("./task.js")

var fs = require('fs')

// Variables
var datafile = "data.json"
var data = require('./data.js')({name: "default", file_name: datafile})

data.read()

// Parse Arguments
var ArgumentParser = require("argparse").ArgumentParser;


var parser = new ArgumentParser({
    version: "0.0.1",
    addHelp: true,
    description: "intuitive task management"
})

parser.addArgument (
    [ "-a", "--add"],
    {
        help: "adds task",
        nargs: 1
    }
)

parser.addArgument (
    [ "-d", "--delete"],
    {
        help: "deletes task",
        nargs: 1
    }
)

parser.addArgument (
    [ "-p", "--print"],
    {
        help: "prints out internal database",
        action: "storeTrue"
    }
)

var args = parser.parseArgs()


// Exclusive actions
if ((args.add !== null) && (args.delete !== null)){
    error("please only provide a delete or add action")
}

// Add tasks from UI
if (args.add !== null) {
    console.log("Add task")
    arg = args.add

    data.add_task(task(
        {
            name: arg[0]
        }
    ))
}

// Delete tasks from UI
if (args.delete !== null) {
    console.log("Delete task")
    arg = args.delete

    data.delete_task(task(
        {
            name: arg[0]
        }
    ))
}

// Print out database
if (args.print == true) {
    console.log("Arguments: ")
    console.log(args)

    console.log("Internal Database:")
    data.print()
}

// Helper Utilities
function error(msg) {
    console.log("error encountered: " + msg)
    process.exit(1)
}
