import {
    ADD_TODO, LOAD_TODOS, SET_VISIBILITY_FILTER, TOGGLE_TODO, DELETE_TODO, EDIT_TODO ,
    SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED
} from '../consts/actions' 

import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

export function addTodo(text) {
  const formdata = new FormData()
  formdata.append('text', text)
  return (dispatch) => {
    axios.post(`${url}todo`, formdata)
      .then((res) =>
        dispatch({type: ADD_TODO, id: res.data._id, text})    
      ).catch((err) =>
        console.log(err)
      )
  }
}

export function loadTodos() {
  return (dispatch) => {
    axios.get(`${url}todos`)
      .then((res) => {
        let todos = res.data
        dispatch({type: LOAD_TODOS, todos})
      }).catch((err) =>
        console.log(err)
      )
  }
}

//req.body.todo_id
export function toggleTodo (id) {
  return (dispatch) => {
      axios.put(`${url}todo/toggle`, { id })
        .then((res) =>
          dispatch({type: TOGGLE_TODO, id})
        ).catch((err) => 
          console.log(err)
        )
  }
}

//req.body.todo_id
export function deleteTodo (id) {
  return (dispatch) => {
      axios.delete(`${url}todo/delete`, {params: { id }})
        .then((res) =>
          dispatch({type: DELETE_TODO, id})
        ).catch((err) => 
          console.log(err)
      )
  }
}

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const editTodo = (id, text) => ({
  type: EDIT_TODO,
  id,
  text
})

export const VisibilityFilters = {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
}