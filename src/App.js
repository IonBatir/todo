import React from 'react'
import VisibleTodoList from './containers/VisibleTodoList'
import Head from './containers/Head'
import AddTodo from './containers/AddTodo'
import './App.css'

class App extends React.Component {
  state = {
    response: ''
  }
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response =  await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div>
        <Head />
        <VisibleTodoList />
        <AddTodo />
        {this.state.response}    
      </div>
    )
  }
}

export default App