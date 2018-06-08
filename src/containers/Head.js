import { connect } from 'react-redux'
import { VisibilityFilters } from '../redux/actions'
import Header from '../components/Header'

const getFilterValue = filter => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return 0
    case VisibilityFilters.SHOW_ACTIVE:
      return 1
    case VisibilityFilters.SHOW_COMPLETED:
      return 2
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state, ownProps) => ({
  value: getFilterValue(state.visibilityFilter) 
})

export default connect(
  mapStateToProps
)(Header)