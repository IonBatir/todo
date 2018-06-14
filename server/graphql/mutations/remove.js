const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const TodoType = require('../types/todo');
const TodoModel = require('../../models/todo');

exports.remove = {
  type: TodoType.todoType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedtodo = TodoModel.findByIdAndRemove(params.id).exec();
    if (!removedtodo) {
      throw new Error('Error')
    }
    return removedtodo;
  }
}