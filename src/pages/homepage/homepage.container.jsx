import { connect } from 'react-redux'

import { selectCurrentUser } from '../../redux/user/user.selectors'

import Homepage from './homepage.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state)
})

const HomeContainer = connect(mapStateToProps)(WithSpinner(Homepage))

export default HomeContainer