// Task for task
// by Rafi Khan

module.exports = function(options) {
    return new Task(options)
}

function Task(opts) {
    this.name = opts.name
}

