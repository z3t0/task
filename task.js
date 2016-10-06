// Task for task
// by Rafi Khan

module.exports = function(options) {
    return new Task(options)
}

function Task(opts) {
    this.name = opts.name
    this.description = opts.description || ""
    this.date = opts.date || null
    this.list = opts.list || "default"

}

Task.prototype.print = function() {
    console.log("Task: " + this.name)
    console.log("\tDescription: " + this.description)
    console.log("\tDate: " + this.date)
    console.log("\tList: " + this.list)
}
