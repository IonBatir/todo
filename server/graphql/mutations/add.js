const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean
const TodoType = require('../types/todo');
const TodoModel = require('../../models/todo');

exports.add = {
  type: TodoType.todoType,
  args: {
    text: {
      type: new GraphQLNonNull(GraphQLString),
    },
    completed: {
      type: new GraphQLNonNull(GraphQLBoolean)
    }
  },
  resolve(root, params) {
    const tModel = new TodoModel(params);
    const newTodo = tModel.save();
    if (!newTodo) {
      throw new Error('Error');
    }
    return newTodo
  }
}