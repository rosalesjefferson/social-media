import userTypes from '../user/user.types'
import crudTypes from './crud.types'
import { deletePosts } from './crud.utils'

const INITIAL_STATE = {
	UID: '',
	posts: [],
	following: [],
	isFetching: false,
	error: null,
}

const crudReducer = (state=INITIAL_STATE, action) =>{
	switch(action.type){
		case crudTypes.FETCH_POSTS_START:
		return {
			...state,
			isFetching: false
		}

		case crudTypes.FETCH_POSTS_SUCCESS:
		return{
			...state,
			UID: action.payload.UID,
			posts: [ ...action.payload.posts ],
			following: [ ...action.payload.following ],
			isFetching: true
		}

		case crudTypes.EDIT_LIKE_COMMENT_SUCCESS:
		return{
			...state,
			posts: [ ...action.payload ]
		}

		case crudTypes.DELETE_POST_SUCCESS:
		return{
			...state,
			posts: [ ...deletePosts(state.posts, action.payload) ]
		}

		case userTypes.SIGN_OUT_SUCCESS:
		return{
			...state,
				UID: '',
				posts: [],
				following: [],
				isFetching: false,
				error: null,

		}

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































// import crudTypes from './crud.types'

// const INITIAL_STATE = {
// 	posts: null,
// 	isFetching: false,
// 	error: null,
// }

// const crudReducer = (state=INITIAL_STATE, action) =>{
// 	switch(action.type){
// 		case crudTypes.FETCH_POSTS_START:
// 		return {
// 			...state,
// 			isFetching: false
// 		}

// 		case crudTypes.FETCH_POSTS_SUCCESS:
// 		return{
// 			...state,
// 			posts:  { ...state.posts, ...action.payload.posts },
// 			isFetching: true
// 		}

// 		case crudTypes.FETCH_POSTS_FAILURE:
// 		case crudTypes.ADD_POST_FAILURE:
// 		case crudTypes.EDIT_CAPTION_FAILURE:
// 		case crudTypes.ADD_COMMENT_FAILURE:
// 		case crudTypes.ADD_LIKE_FAILURE:
// 		return{
// 			...state,
// 			error: action.payload,
// 			isFetching: false
// 		}

// 		default:
// 		return state
// 	}
// }

// export default crudReducer
