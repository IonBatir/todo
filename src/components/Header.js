import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

const Header = ({ value }) => (
  <AppBar position="static" color="default">
  <Tabs
    value={value}
    indicatorColor="primary"
    textColor="primary"  
  >
    <FilterLink filter={VisibilityFilters.SHOW_ALL} >All</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE} >Active</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED} >Completed</FilterLink>
  </Tabs>
</AppBar>
)



export default Header