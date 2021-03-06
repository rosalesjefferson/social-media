import React, {  useEffect } from 'react'
import { connect } from 'react-redux'

import { firestore } from '../../firebase/firebase.utils'

import { fetchPostsStart, modifiedSuccess, deletePostSuccess } from '../../redux/crud/crud.actions'
import { selectPostsWithFollowing, selectUID } from '../../redux/crud/crud.selectors'

import LoadingSpinner from '../loading-spinner/loading-spinner.component'
import PostItem from '../../components/post-item/post-item.component'

import './posts.style.scss'

const Posts = ({ fetchPostsStart, modifiedSuccess, deletePostSuccess, currentUID, posts, isTimeline }) =>{
	useEffect(() =>{
		let unsubscribed = false

		const postsLists = () =>{
		  const postCollectionRef = firestore.collection('posts')
		    if(!unsubscribed){
			  	try{
			  	    unsubscribed = postCollectionRef.onSnapshot(snapShot =>{
						snapShot.docChanges().forEach(realtimeData =>{
							if(realtimeData.type === 'added') fetchPostsStart()
							if(realtimeData.type === 'removed') deletePostSuccess({ id: realtimeData.doc.id, ...realtimeData.doc.data() })
							if(realtimeData.type === 'modified') modifiedSuccess()
						})
					})
			  		window.scrollTo(0, 0)
			  	} catch(err){
			  		console.log(err.message)
			  	} 	
		    }
		}
// listening to this while the Coronavirus pandemic is ongoing. This song is very fitting...
		postsLists()

		return () => { unsubscribed = true }
	}, [fetchPostsStart, modifiedSuccess, deletePostSuccess])

	console.log('Posts Component')
	return(
		<div className='posts__container'>
			{
				posts === null ? <LoadingSpinner substitutionSmall='true'/>
				
				: posts !== null && posts.length > 0 ? 
				posts.map(post  =>(
					<PostItem key={ post.id } currentUID={ currentUID } posts={ post } />
				)) 

				: <h4 className='posts__no-post'>No post.</h4> 
			}
		</div>
	)
}

const mapsDispatchToProps = dispatch => ({
	fetchPostsStart: () => dispatch(fetchPostsStart()),
	modifiedSuccess: () => dispatch(modifiedSuccess()),
	deletePostSuccess: data => dispatch(deletePostSuccess(data))
})

const mapsStateToProps = (state, ownProps) => {
	const { isTimeline, timelineUID } = ownProps
	return({
		posts: selectPostsWithFollowing(isTimeline, timelineUID)(state),
		currentUID: selectUID(state)
	})
}

export default connect(mapsStateToProps, mapsDispatchToProps)(Posts)




// return(
// 		<div className='posts__container'>
// 			{ 
// 		  		!isFetching 
// 				? <LoadingSpinner /> : ''
// 			}

// 			{
// 				isFetching && posts.length > 0 ? posts.map(post  =>(
// 					<PostItem key={ post.id } currentUID={ currentUID } posts={ post } />
// 				)) 
// 				: ''
// 			}

// 			{
// 				isFetching && posts.length < 1 ? <h4 className='posts__no-post'>No post.</h4> : ''
// 			}
// 		</div>
// 	)