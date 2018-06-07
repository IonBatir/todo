import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List';
import Todo from './Todo'

const TodoList = ({ todos, toggleTodo, deleteTodo }) => (
  <List>
    {todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => toggleTodo(todo.id)}
          onClickDelete={() => deleteTodo(todo.id)}
        />
      )}
  </List>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}

export default TodoList