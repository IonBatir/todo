import { LOAD_TODOS, TOGGLE_TODO, DELETE_TODO, EDIT_TODO } from '../consts/actions'

const todos = (state = [], action) => {
    switch (action.type) {
      case LOAD_TODOS:
      return [
          ...state,
          ...action.todos
      ]
      case TOGGLE_TODO:
        return state.map(todo =>
          (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
            : todo
        )
      case DELETE_TODO:
        return state.filter(todo => todo.id !== action.id)
      case EDIT_TODO:
        return [
          ...state.slice(0, action.id),
          {...state[action.id], text: action.text},
          ...state.slice(action.id + 1)
        ]
      default:
        return state
    }
  }
  
  export default todos