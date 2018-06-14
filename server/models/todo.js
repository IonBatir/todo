// server/models/Todo.js
const mongoose = require('mongoose')

let TodoSchema = new mongoose.Schema({
        text: String,
        completed: Boolean    
});

TodoSchema.methods.toggle = function() {
    this.completed = !this.completed
    return this.save()
}
module.exports = mongoose.model('Todo', TodoSchema)