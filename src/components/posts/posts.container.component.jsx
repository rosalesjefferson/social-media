import { connect } from 'react-redux'
import { compose } from 'redux'

import { selectIsPostsFetching } from '../../redux/crud/crud.selectors'

import Posts from './posts.component'
import WithSpinner from '../with-spinner/with-spinner.component'

const mapStateToProps = (state) => ({
	isFetching: selectIsPostsFetching(state)
})

const PostContainer = connect(mapStateToProps)(WithSpinner(Posts))
// const PostContainer = compose(
// 	connect(mapStateToProps),
// 	WithSpinner
// )(Posts)

export default PostContainer