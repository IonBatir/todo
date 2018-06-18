import {
    ADD_TODO, LOAD_TODOS, SET_VISIBILITY_FILTER, TOGGLE_TODO, DELETE_TODO, EDIT_TODO ,
    SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED
} from '../consts/actions' 

import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


const uri = process.env.NODE_ENV === 'production' ? "/graphql/" : "http://localhost:5000/graphql/"
const httpLink = new HttpLink({ uri })
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()    
})

const GET_QUERY = gql`
  query TodoQuery {
    todos {
      id, text, completed
    }
  }
`;

const ADD_MUTATION = gql`
mutation AddTodo($text: String!) {
  addTodo(text: $text, completed: false) {
    id, text, completed
  }
}
`;

const TOGGLE_MUTATION = gql`
mutation ToggleTodo($id: String!)  {
  toggleTodo(id: $id) {
    id, text, completed
  }
}
`;

const REMOVE_MUTATION = gql`
mutation RemoveTodo($id: String!) {
  removeTodo(id: $id) {
    id, text, completed
  }
}
`;

export function loadTodos() {
  return (dispatch) => {
    client.query({ 
      query: GET_QUERY 
    }).then(data =>
      dispatch({type: LOAD_TODOS, todos: data.data.todos})
    )
  }
}

export function addTodo(text) {
  return (dispatch) => {
    client.mutate({ 
      mutation: ADD_MUTATION,
      variables: {text} 
    }).then(data => 
      dispatch({type: ADD_TODO, id: data.data.addTodo.id, text})
    )
  }
}

export function toggleTodo (id) {
  return (dispatch) => {
    client.mutate({ 
      mutation: TOGGLE_MUTATION,
      variables: {id} })
    .then(
      dispatch({type: TOGGLE_TODO, id})  
    )
  }
}

export function deleteTodo (id) {
  return (dispatch) => {
    client.mutate({ 
      mutation: REMOVE_MUTATION, 
      variables: {id}      
    }).then(
      dispatch({type: DELETE_TODO, id})
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