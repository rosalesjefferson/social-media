import React, {  useEffect } from 'react'
import { connect } from 'react-redux'

import { firestore } from '../../firebase/firebase.utils'

import { fetchPostsStart } from '../../redux/crud/crud.actions'
import { selectPostsWithFollowing, selectUID } from '../../redux/crud/crud.selectors'

import PostItem from '../../components/post-item/post-item.component'



import './posts.style.scss'


const Posts = ({ fetchPostsStart, currentUID, posts, isTimeline }) =>{
	useEffect(() =>{
		let unsubscribed = false
		const postsLists = async() =>{
		  const postCollectionRef = firestore.collection('posts')

		    if(!unsubscribed){
			  	try{
			  	    unsubscribed = postCollectionRef.onSnapshot(snapShot =>{
						snapShot.docChanges().forEach(realtimeData =>{
							if(realtimeData.type ==='added' || realtimeData.type ==='modified' || realtimeData.type === 'removed'){
								console.log(realtimeData.type)
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

	}, [fetchPostsStart])

	return(
		<div className='posts__container'>
			{
				posts.map(post  =>(
					<PostItem key={ post.id } currentUID={ currentUID } posts={ post } />
				))
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
	})
}

export default connect(mapsStateToProps, mapsDispatchToProps)(Posts)

