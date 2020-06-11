import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { firestore } from '../../firebase/firebase.utils'

import { fetchPostsStart, fetchPostsSuccessful } from '../../redux/crud/crud.actions'
import { selectPostsWithFriends, selectUID } from '../../redux/crud/crud.selectors'

import AddPost from '../../components/add-post/add-post.component'
import PostItem from '../../components/post-item/post-item.component'

import './homepage.component.scss'

const Hompage = ({ fetchPostsStart, fetchPostsSuccessful, posts, currentUID }) =>{
	useEffect(() =>{
		const postsLists = async() =>{
			const postCollectionRef = firestore.collection('posts')
		    postCollectionRef.onSnapshot(snapShot =>{
				snapShot.docChanges().forEach(realtimeData =>{
					if(realtimeData.type ==='added' || realtimeData.type ==='modified' || realtimeData.type === 'removed'){
						fetchPostsStart()
						console.log(realtimeData.type, 'type')
					}
				})
			})
		}
		postsLists()
	}, [fetchPostsStart])

	console.log('homepage')
	return(
	<div className='homepage'>
		<div className='container'>
			<div className='newsfeed__container'>
				<AddPost />
				{
					posts.map(post  =>(
						<PostItem key={ post.id } currentUID={ currentUID } posts={ post } />
					))
				}
			</div>
			<div className='friends-suggestion-container'>
				<h1> FRIENDS </h1>
			</div>
		</div>
	</div>
)}

const mapsDispatchToProps = dispatch => ({
	fetchPostsStart: () => dispatch(fetchPostsStart()),
	fetchPostsSuccessful: (posts) => dispatch(fetchPostsSuccessful(posts))
})

const mapsStateToProps = (state) => ({
	posts: selectPostsWithFriends(state),
	currentUID: selectUID(state)
})

export default connect(mapsStateToProps, mapsDispatchToProps)(Hompage)


// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }