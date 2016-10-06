// List for task
// by Rafi Khan

module.exports = function(options) {
    return new List(options)
}

function List(opts) {
    this.name = opts.name
    this.description = opts.description || ""

    this.tasks = []
}

List.prototype.print = function() {
    console.log("List: " + this.name)
    for (var i = 0; i < this.tasks.length; i++) {
        this.tasks[0].print()
    }
}
