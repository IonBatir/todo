import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import { addTodo } from '../redux/actions'

const mapDispatchToProps = dispatch => ({
  addNewTodo: text => dispatch(addTodo(text))
})

export class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
  }

  render() {  
    const { addNewTodo } = this.props;
    const onSubmit = e => {
      e.preventDefault()
      if (!this.state.value.trim())
        return
      addNewTodo(this.state.value)
      this.setState({value: ''})
    }
    const onChange = e => this.setState({value: e.target.value})
    return (
      <form onSubmit={onSubmit}>
        <Input
        placeholder="New Task"
        value={this.state.value}
        onChange={onChange}
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

export default connect(null, mapDispatchToProps)(AddTodo)