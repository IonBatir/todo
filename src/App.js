import React from 'react'
import VisibleTodoList from './containers/VisibleTodoList'
import Head from './containers/Head'
import AddTodo from './containers/AddTodo'
import './App.css'

const App = () => (
  <div>
    <Head />
    <VisibleTodoList />
    <AddTodo />    
  </div>
)

export default App