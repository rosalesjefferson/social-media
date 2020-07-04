import { connect } from 'react-redux'

import { selectIsFetching } from '../../redux/user/user.selectors'
import Timeline from './timeline.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const mapStateToProps = (state) => ({
	isFetching: selectIsFetching(state)
})

const TimelineContainer = connect(mapStateToProps)(WithSpinner(Timeline))

export default TimelineContainer