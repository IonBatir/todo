const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const TodoType = require('../types/todo');
const TodoModel = require('../../models/todo');

exports.toggle = {
  type: TodoType.todoType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    return TodoModel.findById(params.id)
        .then(todo => {
            return todo.toggle()
        })
        .catch(err => new Error(err));
  }
}