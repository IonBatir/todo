import React from 'react'
import List from '@material-ui/core/List';
import Todo from './Todo'

class TodoList extends React.Component {  
  componentWillMount() {
    this.props.loadTodos()
  }

  render() {
    const { todos, toggleTodo, deleteTodo } = this.props;
    return (
      <List>
        {todos.map(todo =>
          <Todo
            key={todo._id}
            {...todo}
            onClick={() => toggleTodo(todo._id)}
            onClickDelete={() => deleteTodo(todo._id)}
          />
        )}
      </List>
    )
  }
}

export default TodoList;