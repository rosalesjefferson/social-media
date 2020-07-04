import crudTypes from './crud.types'

const INITIAL_STATE = {
	posts: null,
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
			posts:  { ...state.posts, ...action.payload.posts },
			isFetching: true
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