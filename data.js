// Data for task
// by Rafi Khan

// Required Modules
var fs = require('fs')
var jsonfile = require('jsonfile')
var prompt = require('prompt-console')
var list = require('./list.js')

module.exports = function(options) {
    return new Data(options)
}

function Data(opts) {
    this.name = opts.name
    this.file_name = opts.file_name || console.log("no file name for data")

    data = {}
    data.lists = []

    this.data = data
}

// Task management
Data.prototype.add_task = function(task) {
    // Check if list exists
    var list = this.get_list(task.list)
    if (list != null) {
        list.tasks.push(task)
    }

    else {
        // Create list if it does not exist
        this.add_list(task.list)
        list = this.get_list(task.list)
        list.tasks.push(task)
    }

    this.write()
}

Data.prototype.get_task = function(name) {
    var lists = this.data.lists

    var hits = []

    for (var i = 0; i < lists.length; i++) {
        var tasks = lists[i].tasks

        hits[i] = []

        for (var j = 0; j < tasks.length; j++) {
            if (tasks[j].name != name)
                continue

            hits[i].push(j)
        }
    }

    var index = 1

    for (var i = 0; i < hits.length; i++) {
        console.log("List: " + lists[i].name)

        for (var j = 0; j < hits[i].length; i++) {
            console.log(index.toString() + ").")

            lists[hits[i]].tasks.print()

            index++
        }

    }

    prompt.ask([{
        question: 'Which would you like to delete?',
        color: 'red',
        name: 'index'
    }], function(res) {
        var res = res.index
        var index = 1

        for (var i = 0; i < hits.length; i++) {

            for (var j = 0; j < hits[i].length; i++) {
                if (index == res.index) {
                    // Found our task
                    var info = {
                        list_index: i,
                        task_index: j
                    }

                    return info
                }

                index++
            }

        }
    })

    return null
}

Data.prototype.delete_task = function(name) {

    var search = this.get_task(name)
    if (search != null) {
        this.data.lists[search.list_index].tasks.splice(search.task_index, 1)
        this.write()
    }

    else {
        error("task not found")
    }

}

Data.prototype.add_list = function(name) {
    this.data.lists.push(list({
        name: name,
    }))
}

Data.prototype.delete_list = function(name) {
    var list = this.get_list(name)
    if (list != null)
        delete list
}

Data.prototype.get_list = function(name) {
    var lists = this.data.lists

    for (var i = 0; i < lists.length; i++) {
        if (lists[i].name == name)
            return lists[i]
    }

    return null
}

// File IO
Data.prototype.write = function() {
    try {
        jsonfile.writeFileSync(this.file_name, this.data)
    }

    catch (err) {
        console.log(err)
    }
}

Data.prototype.read = function() {

    // clear data
    this.data = {}
    this.data.lists = []

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
        data = jsonfile.readFileSync(this.file_name)
    }

    catch (err) {
        console.log(err)
        error("failed to read data file")
    }

    this.data = data
}

Data.prototype.print = function() {
    var lists = this.data.lists
    debugger
    for (var i = 0; i < lists.length; i++) {
        lists[i].print()
    }
}

function error(msg) {
    console.log("error encountered: " + msg)
    process.exit(1)
}
