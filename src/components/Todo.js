import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'

const Todo = ({ onClick, onClickDelete, completed, text }) => (
  <ListItem
  role={undefined}  
  dense
  button
  >
    <Checkbox
      tabIndex={-1}
      onClick={onClick}
      checked={completed}
      color="primary"
      disableRipple
    />
    <ListItemText primary={text} />
    <ListItemSecondaryAction>
      <IconButton onClick={onClickDelete} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
)

export default Todo