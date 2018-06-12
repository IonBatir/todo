import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import axios from 'axios'

class AddTodo extends React.Component {
  render() {
    return (
      <form
    onSubmit={e => {
      e.preventDefault()
      if (!this.input.value.trim())
        return
      const _url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
      const formdata = new FormData()
      formdata.append('text', this.input.value)
      axios.post(`${_url}todo`,formdata).then((res) => {
        console.log("New todo added")
      }).catch((err)=>{console.log(err);})
      this.input.value = ''
    }}
    >
      <Input
      placeholder="New Task"
      inputRef={node => this.input = node}
      inputProps={{
        'aria-label': 'New Task',
      }}
      />
      <Button id="fab" type="submit" variant="fab" color="primary">
        <AddIcon />
      </Button>
    </form>
    )
  }
}

export default connect()(AddTodo)