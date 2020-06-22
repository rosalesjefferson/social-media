import crudTypes from './crud.types'

const INITIAL_STATE = {
	posts: null,
	// following: [],
	isFetching: false,
	error: null,
}

const crudReducer = (state=INITIAL_STATE, action) =>{
	// console.log(uniquePosts(state, action.payload))
	switch(action.type){
		case crudTypes.FETCH_POSTS_START:
		return {
			...state,
			isFetching: false
		}

		case crudTypes.FETCH_POSTS_SUCCESS:
		return{
			...state,
			posts:  { ...state.posts, ...action.payload.posts },
			// following: [ ...state.following, ...action.payload.following ],
			isFetching: true
		}

		// case crudTypes.ADD_POST_SUCCESS:
		// case crudTypes.MODIFIED_SUCCESS:
		// case crudTypes.ADD_LIKE_SUCCESS:
		// return{
		// 	...state,
		// 	posts:  { ...state.posts, posts: [ ...state.posts.posts, action.payload] },
		// 	isFetching: true
		// }

		// case crudTypes.DELETE_POST_SUCCESS:
		// return{
		// 	...state,
		// 	posts:  { ...state.posts, posts: deletePost(state.posts.posts, action.payload)  },
		// 	// posts:  { ...state.posts, posts: [ ...state.posts.posts, action.payload] },
		// 	isFetching: true
		// }

		case crudTypes.FETCH_POSTS_FAILURE:
		case crudTypes.ADD_POST_FAILURE:
		case crudTypes.EDIT_CAPTION_FAILURE:
		case crudTypes.ADD_COMMENT_FAILURE:
		case crudTypes.ADD_LIKE_FAILURE:
		return{
			...state,
			error: action.payload,
			isFetching: false
		}

		default:
		return state
	}
}

export default crudReducer