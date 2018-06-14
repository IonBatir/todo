import {
    ADD_TODO, LOAD_TODOS, SET_VISIBILITY_FILTER, TOGGLE_TODO, DELETE_TODO, EDIT_TODO ,
    SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED
} from '../consts/actions' 

import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/graphql/" : "http://localhost:5000/graphql/"

const GET_QUERY = `
  {
    todos {
      id, text, completed
    }
  }
`;
const ADD_QUERY = text => `
mutation {
  addTodo(text: "${text}", completed: false) {
    id, text, completed
  }
}
`;

const TOGGLE_QUERY = id => `
mutation {
  toggleTodo(id: "${id}") {
    id, text, completed
  }
}
`;

const REMOVE_QUERY = id => `
mutation {
  removeTodo(id: "${id}") {
    id, text, completed
  }
}
`;

export function loadTodos() {
  return (dispatch) => {
    axios.post(`${url}`, {query: GET_QUERY})
      .then((res) => {
        const todos = res.data.data.todos
        dispatch({type: LOAD_TODOS, todos})
      }).catch((err) =>
        console.log(err)
      )
  }
}

export function addTodo(text) {
  return (dispatch) => {
    axios.post(`${url}`, {query: ADD_QUERY(text)})
      .then((res) => 
        dispatch({type: ADD_TODO, id: res.data.data.addTodo.id, text})          
      ).catch((err) =>
        console.log(err)
      )
  }
}

//req.body.id
export function toggleTodo (id) {
  return (dispatch) => {
      axios.post(`${url}`, {query: TOGGLE_QUERY(id)})
        .then((res) => 
          dispatch({type: TOGGLE_TODO, id})          
        ).catch((err) => 
          console.log(err)
        )
  }
}

//req.query.id
export function deleteTodo (id) {
  return (dispatch) => {
      axios.post(`${url}`, {query: REMOVE_QUERY(id)})
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