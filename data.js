// Data for task
// by Rafi Khan

// Required Modules
var fs = require('fs')

module.exports = function(options) {
    return new Data(options)
}

function Data(opts) {
    var newData = {}
    newData.name = opts.name
    newData.file_name = opts.file_name || console.log("no file name for data")

    data = {}
    data.lists = {a:'a'}

    newData.data = data

    console.log(newData)

    return newData
}

// Task management
Data.prototype.add_task = function(task) {
    // Check if list exists
    if (!this.check_list(task.list)) {
        // Create list if it does not exist
        this.add_list(task.list)
    }

    this.data.lists[task.list].push(task)

    this.write()
}

Data.prototype.delete_task = function(task) {
    if (this.check_list(task.list)){
        var list = this.data.lists[task.list]

        var index

        // TODO: partial task name and options for matched
        for (var i = 0;i < list.length; i++) {
            if(list[i].name != task.name)
                continue
            index = i
        }

        // Remove from array
        if (index != null) {
            list.splice(index, 1)
        }

    }

    // TODO: check other lists as well

    else {
        error("list for task not found")
    }

    error("task not found")

    this.write()
}

Data.prototype.add_list = function(name) {
    this.data.lists[name] = {}
}

Data.prototype.delete_list = function(name) {
    delete this.data.lists[name]
}

Data.prototype.check_list = function(name) {
    console.log(this)
    if (this.data.lists.hasOwnProperty(name))
        return true
    else
        return false
}

// File IO
Data.prototype.write = function() {
    try {
        jsonfile.writeFileSync(this.file_name, data)
    }

    catch (err) {
        console.log(err)
    }
}

Data.prototype.read = function() {

    // clear data
    this.data = {}

    // Check if file exists
    try {
        var stat = fs.statSync(this.file_name)
    }

    catch (err) {
        // create data base file as it does not exist
        if(err.code == "ENOENT") {
                console.log("data file not found")
                return
        }
    }

    var data

    // Load file
    try {
        data = json.readFileSync(this.file_name)
    }

    catch (err) {
        error("failed to read data file")
    }

    this.data = data
}

function error(msg) {
    console.log("error encountered: " + msg)
    process.exit(1)
}
