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


export const addPostFailure = (err) => ({
	type: crudTypes.ADD_POST_FAILURE,
	payload: err
})




// EDIT POST ACTIONS
export const editCaptionStart = (post) => ({
	type: crudTypes.EDIT_CAPTION_START,
	payload: post
})

export const editCaptionFailure = (err) => ({
	type: crudTypes.EDIT_CAPTION_FAILURE,
	payload: err
})


// DELETE POST ACTIONS
export const deletePostStart = (post) => ({
	type: crudTypes.DELETE_POST_START,
	payload: post
})

export const deletePostFailure = (err) => ({
	type: crudTypes.DELETE_POST_FAILURE,
	payload: err
})





// ADD COMMENT ACTIONS
export const addCommentStart = (comment) => ({
	type: crudTypes.ADD_COMMENT_START,
	payload: comment
})


export const addCommentFailure = (err) => ({
	type: crudTypes.ADD_COMMENT_FAILURE,
	payload: err
})




// ADD LIKE ACTIONS
export const addLikeStart = (post) => ({
	type: crudTypes.ADD_LIKE_START,
	payload: post
})

export const addLikeFailure = (err) => ({
	type: crudTypes.ADD_LIKE_FAILURE,
	payload: err
})



// POST EDIT DELETE COMMENT SUCCESS

export const addPostSuccess = (data) =>({
	type: crudTypes.ADD_POST_SUCCESS,
	payload: data
})

export const modifiedSuccess = (data) =>({
	type: crudTypes.MODIFIED_SUCCESS,
	payload: data
})

export const deletePostSuccess = (data) =>({
	type: crudTypes.DELETE_POST_SUCCESS,
	payload: data
})

export const addLikeSuccess = (data) =>({
	type: crudTypes.ADD_LIKE_SUCCESS,
	payload: data
})