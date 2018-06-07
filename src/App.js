import React from 'react'
import VisibleTodoList from './containers/VisibleTodoList'
import Head from './containers/Head'
import AddTodo from './containers/AddTodo'
import Grid from '@material-ui/core/Grid'

const App = () => (
  <Grid item md={6}>
    <Head />
    <VisibleTodoList />
    <AddTodo />    
  </Grid>
)

export default App