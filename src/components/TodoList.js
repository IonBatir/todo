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
            key={todo.id}
            {...todo}
            onClick={() => toggleTodo(todo.id)}
            onClickDelete={() => deleteTodo(todo.id)}
          />
        )}
      </List>
    )
  }
}

export default TodoList;