import { takeLatest, put, all, call } from 'redux-saga/effects';

import { firestore } from '../../firebase/firebase.utils'
import { getCurrentUser, createUserProfile } from '../../firebase/firebase.utils.user'
import { getPosts } from '../../firebase/firebase.crud.utils'

import crudTypes from './crud.types'
import { 
			fetchPostsSuccessful, 
			fetchPostsFailure,

			addPostSuccess,
			addPostFailure 
		} from './crud.actions'

export function* getLatestPosts(){
	const postsCollectionRef = firestore.collection('posts')
	try{
		const snapShot = yield postsCollectionRef.get()
		const postLists = yield call(getPosts, snapShot)
		return postLists
	}catch(err){
		yield put (fetchPostsFailure(err.message))
	}

}


export function* fetchPosts(){
	try{
		const latestPosts = yield getLatestPosts()
		yield put(fetchPostsSuccessful(latestPosts))
	}catch(err){
		yield put(fetchPostsFailure(err.message))
	}
}


export function* addPost({ payload: { post } }){
	const created_at = new Date().toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
	try{
		const currentUserInfo = yield getCurrentUser()
		const userDocReference = yield call(createUserProfile, currentUserInfo)
		const userSnapshot = yield userDocReference.get()
		const { firstName, lastName } = userSnapshot.data()

		const postsCollectionRef = firestore.collection('posts')

		yield postsCollectionRef.add({
			created_at,
			post: post,
			currentUserId: userSnapshot.id,
			email: currentUserInfo.email,
			firstName: firstName,
			lastName: lastName
		})

		const latestPosts = yield getLatestPosts()
		yield put(addPostSuccess(latestPosts))
	}catch(err){
		yield put(addPostFailure(err.message))
	}
}

export function* addComment({ payload: { comment } }){
	console.log(comment, 'commentssssssssss')
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