const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    reminderTime: Date
})

module.exports = mongoose.model('ToDo',todoSchema)