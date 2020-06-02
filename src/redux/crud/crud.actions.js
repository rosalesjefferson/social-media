import crudTypes from './crud.types'

// FETCH POST ACTIONS
export const fetchPostsStart = () =>({
	type: crudTypes.FETCH_POSTS_START
})

export const fetchPostsSuccessful = (posts) =>({
	type: crudTypes.FETCH_POSTS_SUCCESS,
	payload: posts
})

export const fetchPostsFailure = (err) =>({
	type: crudTypes.FETCH_POSTS_FAILURE,
	payload: err
})


// ADD POST ACTIONS
export const addPostStart = (post) => ({
	type: crudTypes.ADD_POST_START,
	payload: post
})

export const addPostSuccess = (post) =>({
	type: crudTypes.ADD_POST_SUCCESS,
	payload: post
})

export const addPostFailure = (err) => ({
	type: crudTypes.ADD_POST_FAILURE,
	payload: err
})


// ADD COMMENT ACTIONS
export const addCommentStart = (comment) => ({
	type: crudTypes.ADD_COMMENT_START,
	payload: comment
})

export const addCommentSuccess = (comment) =>({
	type: crudTypes.ADD_COMMENT_SUCCESS,
	payload: comment
})

export const addCommentFailure = (err) => ({
	type: crudTypes.ADD_COMMENT_FAILURE,
	payload: err
})