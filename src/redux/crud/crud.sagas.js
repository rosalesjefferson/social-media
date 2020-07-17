import { takeLatest, put, all, call } from 'redux-saga/effects';

import { firestore } from '../../firebase/firebase.utils'
import { getCurrentUser } from '../../firebase/firebase.utils.user'
import { 
		getPosts, 
		getImageUrl, 
		getCurrentUserInfo, 
		addCommentToPost, 
		postToDelete,
		saveEditCaption,
		addLikeToPost,
		getPostsOnly
	} from '../../firebase/firebase.crud.utils'

import crudTypes from './crud.types'
import userTypes from '../user/user.types'
import { 
			fetchPostsSuccessful,
			editLikeCommentSuccess,

			fetchPostsFailure,
			addPostFailure,
			addLikeFailure,
			editLikeCommentFailure,
			editCaptionFailure,
			addCommentFailure,
			deletePostFailure
		} from './crud.actions'

export function* fetchPostsOnly (){
	const postsCollectionRef = firestore.collection('posts')
	try{
		const snapShot = yield postsCollectionRef.get()
		const posts = yield call(getPostsOnly, snapShot)
		return posts
	}catch(err){
		return err
	}

}

export function* getLatestPosts(){
	const postsCollectionRef = firestore.collection('posts').orderBy('timestamp')
	try{
		const snapShot = yield postsCollectionRef.get()
		const { UID, posts, following } = yield call(getPosts, snapShot)
		yield put(fetchPostsSuccessful({ UID, posts, following }))
	}catch(err){
		yield put(fetchPostsFailure(err.message))
	}
}

export function* fetchPosts(){
	try{
		 yield getLatestPosts()
	}catch(err){
		yield put(fetchPostsFailure(err.message))
	}
}

export function* addPost({ payload: { post, imageObject } }){
	// const created_at = new Date().toLocaleString("en-US", {
 //      weekday: "long",
 //      day: "numeric",
 //      month: "long",
 //      year: "numeric",
 //    });
 	const now = Date.now()
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
		const { firstName, lastName, userDP, email } = userSnapshot.data()
		// reference to posts database
		const postsCollectionRef = firestore.collection('posts')
		
		// Add post to posts database
		yield postsCollectionRef.add({
			timestamp: now,
			postImageUrl,
			userDP,
			post,
			email,
			firstName,
			lastName,
			postUID: userSnapshot.id,
			comments: [],
			likes:[]

		})

	}catch(err){
		yield put(addPostFailure(err.message))
	}
}

export function* editCaption({ payload }){
	const postsCollectionRef = firestore.doc(`posts/${payload.postItemId}`)
	try{
		yield saveEditCaption(postsCollectionRef, payload)
	}catch(err){
		yield put(editCaptionFailure(err.message))
	}
}

export function* addComment({ payload }){
	try{
		yield call(addCommentToPost, payload)
	}catch(err){
		yield put(addCommentFailure(err.message))
	}
}

export function* deletePost({ payload: { postItemId } }){
	const postsCollectionRef = firestore.doc(`posts/${postItemId}`)
	try{
		yield call(postToDelete, postsCollectionRef)
	}catch(err){
		yield put(deletePostFailure(err.message))
	}
}

export function* addLike({ payload }){
	try{
		yield call(addLikeToPost, payload)
	}catch(err){
		yield put(addLikeFailure(err.message))
	}
}

export function* modifiedSuccess(){
	console.log('modifiedddddddddddd')
	try{
		const posts = yield fetchPostsOnly()
		yield put(editLikeCommentSuccess(posts))
	}catch(err){
		yield put(editLikeCommentFailure(err))
	}
}

export function* updatePostsWhenFollowing(){
	yield getLatestPosts()
}

export function* onFetchPostsStart(){
	yield takeLatest(crudTypes.FETCH_POSTS_START, fetchPosts)
}

export function* onAddPostsStart(){
	yield takeLatest(crudTypes.ADD_POST_START, addPost)
}

export function* onEditCaptionStart(){
	yield takeLatest(crudTypes.EDIT_CAPTION_START, editCaption)
}

export function* onAddCommentStart(){
	yield takeLatest(crudTypes.ADD_COMMENT_START, addComment)
}

export function* onDeletePostStart(){
	yield takeLatest(crudTypes.DELETE_POST_START, deletePost)
}

export function* onAddLikeStart(){
	yield takeLatest(crudTypes.ADD_LIKE_START, addLike)
}

export function* onUpdatePostsWhenFollowing(){
	yield takeLatest(userTypes.FOLLOW_USER_SUCCESS, updatePostsWhenFollowing)
}

export function* onModifiedSuccess(){
	yield takeLatest(crudTypes.MODIFIED_SUCCESS, modifiedSuccess)
}

export function* crudSagas() {
	yield all([
				call(onFetchPostsStart),
				call(onAddPostsStart),
				call(onAddCommentStart),
				call(onDeletePostStart),
				call(onEditCaptionStart),
				call(onAddLikeStart),
				call(onUpdatePostsWhenFollowing),
				call(onModifiedSuccess)
			])
}