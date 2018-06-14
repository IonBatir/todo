const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const todoModel = require('../../models/todo')
const todoType = require('../types/todo').todoType;

exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      todos: {
        type: new GraphQLList(todoType),
        resolve: function () {
          const todos = todoModel.find().exec()
          if (!todos) {
            throw new Error('Error')
          }
          return todos
        }
      }
    }
  }
});