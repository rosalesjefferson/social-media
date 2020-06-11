import { takeLatest, put, all, call } from 'redux-saga/effects';

import { firestore } from '../../firebase/firebase.utils'
import { getCurrentUser } from '../../firebase/firebase.utils.user'
import { getPosts, getComments, getImageUrl, getCurrentUserInfo, addCommentToPost } from '../../firebase/firebase.crud.utils'

import crudTypes from './crud.types'
import { 
			fetchPostsSuccessful, 
			fetchPostsFailure,

			addPostSuccess,
			addPostFailure ,

			addCommentSuccess,
			addCommentFailure
		} from './crud.actions'

export function* getLatestPosts(){
	const postsCollectionRef = firestore.collection('posts')
	try{
		const currentUser = yield getCurrentUser()
		const snapShot = yield postsCollectionRef.get()
		const { posts, friends } = yield call(getPosts, snapShot, currentUser)
		yield put(fetchPostsSuccessful({ posts, friends }))
	}catch(err){
		yield put(fetchPostsFailure(err.message))
	}
}

export function* fetchPosts(){
	try{
		 yield getLatestPosts()
		//  const { posts, friends } = yield getLatestPosts()
		// yield put(fetchPostsSuccessful({ posts, friends }))
	}catch(err){
		yield put(fetchPostsFailure(err.message))
	}
}

export function* addPost({ payload: { post, imageObject } }){
	const created_at = new Date().toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
	try{
		// get current user
		const currentUser = yield getCurrentUser()
		// get post image 
		const postImageUrl = yield getImageUrl(imageObject)
		// reference to users database
		const userRef = yield call(getCurrentUserInfo, currentUser)
		// get current user database info
		const userSnapshot = yield userRef.get()
		// current user database info
		const { firstName, lastName, currentUserAvatarUrl, email } = userSnapshot.data()
		// reference to posts database
		const postsCollectionRef = firestore.collection('posts')
		
		// Add post to posts database
		yield postsCollectionRef.add({
			created_at,
			postImageUrl,
			currentUserAvatarUrl,
			post,
			email,
			firstName,
			lastName,
			postUID: userSnapshot.id,
			comments: []

		})

		// const { posts, friends } = yield getLatestPosts()
		// yield put(addPostSuccess({ posts, friends }))
	}catch(err){
		yield put(addPostFailure(err.message))
	}
}

export function* addComment({ payload }){
	try{
		yield call(addCommentToPost, payload)
		// const { posts, friends } = yield getLatestPosts()
		// yield put(addCommentSuccess({ posts, friends }))
	}catch(err){
		yield put(addCommentFailure(err.message))
	}


	// FIREBASE TIPS LINK
	// https://www.freecodecamp.org/news/heres-what-i-wish-i-knew-before-i-started-using-firebase-9110d393e193/

}

export function* onFetchPostsStart(){
	yield takeLatest(crudTypes.FETCH_POSTS_START, fetchPosts)
}

export function* onAddPostsStart(){
	yield takeLatest(crudTypes.ADD_POST_START, addPost)
}

export function* onAddCommentStart(){
	yield takeLatest(crudTypes.ADD_COMMENT_START, addComment)
}

export function* crudSagas() {
	yield all([
				call(onFetchPostsStart),
				call(onAddPostsStart),
				call(onAddCommentStart)
			])
}