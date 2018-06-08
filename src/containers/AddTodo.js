import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../redux/actions'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';

const AddTodo = ({ dispatch }) => {
  let input
  return (
    <form
    onSubmit={e => {
      e.preventDefault()
      if (!input.value.trim())
        return
      dispatch(addTodo(input.value))
      input.value = ''
    }}
    >
      <Input
      placeholder="New Task"
      inputRef={node => input = node}
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

export default connect()(AddTodo)