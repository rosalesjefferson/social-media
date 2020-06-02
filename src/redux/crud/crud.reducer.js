import crudTypes from './crud.types'

const INITIAL_STATE = {
	posts: [],
	isFetching: false,
	error: null
}

const crudReducer = (state=INITIAL_STATE, action) =>{
	switch(action.type){
		case crudTypes.FETCH_POSTS_START:
		return {
			...state,
			isFetching: false
		}

		case crudTypes.FETCH_POSTS_SUCCESS:
		case crudTypes.ADD_POST_SUCCESS:
		return{
			...state,
			posts: [ ...action.payload ],
			isFetching: true,
			error: null
		}

		case crudTypes.FETCH_POSTS_FAILURE:
		case crudTypes.ADD_POST_FAILURE:
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