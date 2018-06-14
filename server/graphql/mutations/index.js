const addTodo = require('./add').add;
const removeTodo = require('./remove').remove;
const toggleTodo = require('./toggle').toggle;

module.exports = {
  addTodo,
  removeTodo,
  toggleTodo
}