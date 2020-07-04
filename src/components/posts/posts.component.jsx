import React, {  useEffect } from 'react'
import { connect } from 'react-redux'

import { firestore } from '../../firebase/firebase.utils'

import { fetchPostsStart } from '../../redux/crud/crud.actions'
import { selectPostsWithFollowing, selectUID, selectIsPostsFetching } from '../../redux/crud/crud.selectors'

import LoadingSpinner from '../loading-spinner/loading-spinner.component'
import PostItem from '../../components/post-item/post-item.component'

import './posts.style.scss'

const Posts = ({ fetchPostsStart, isFetching, currentUID, posts, isTimeline }) =>{
	useEffect(() =>{
		let unsubscribed = false
		const postsLists = async () =>{
		  const postCollectionRef = firestore.collection('posts')

		    if(!unsubscribed){
			  	try{
			  	    unsubscribed = postCollectionRef.onSnapshot(snapShot =>{
						snapShot.docChanges().forEach(realtimeData =>{
							if(realtimeData.type ==='added' || realtimeData.type ==='modified' || realtimeData.type === 'removed'){
								fetchPostsStart()
							}
						})
					})
			  	} catch(err){
			  		console.log(err.message)
			  	} 	
		    }
		}
		postsLists()
		return () => { unsubscribed = true }

	}, [])
	console.log('Posts Component')
	return(
		<div className='posts__container'>
			{ 
		  		!isFetching 
				? <LoadingSpinner /> : ''
			}

			{
				isFetching && posts.length > 0 ? posts.map(post  =>(
					<PostItem key={ post.id } currentUID={ currentUID } posts={ post } />
				)) 
				: ''
			}

			{
				isFetching && posts.length < 1 ? <h4 className='posts__no-post'>No post.</h4> : ''
			}
		</div>
	)
}

const mapsDispatchToProps = dispatch => ({
	fetchPostsStart: () => dispatch(fetchPostsStart()),
})

const mapsStateToProps = (state, ownProps) => {
	const { isTimeline, timelineUID } = ownProps
	return({
		posts: selectPostsWithFollowing(isTimeline, timelineUID)(state),
		currentUID: selectUID(state),
		isFetching: selectIsPostsFetching(state)
	})
}

export default connect(mapsStateToProps, mapsDispatchToProps)(Posts)

