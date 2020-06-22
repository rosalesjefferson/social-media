import userTypes from './user.types'
import { uniqueUsers } from './user.utils'
const INITIAL_STATE = {
	currentUser: null,
	userLists: [],
	following: [],
	followers: [],
	error: null
}

const userReducer = (state=INITIAL_STATE, action) =>{
	switch(action.type){
		case userTypes.AUTHENTICATION_SUCCESS:
			return {
				...state,
				currentUser: action.payload
			}

		case userTypes.FETCH_USERS_SUCCESS:
		return{
			...state,
			// userLists: [ ...state.userLists, ...action.payload.users ],
			userLists: [ ...state.userLists, ...uniqueUsers(state.userLists, action.payload.users) ],
			following: [ ...state.following, ...action.payload.following ]
		}

		case userTypes.FOLLOW_USER_SUCCESS:
		return{
			...state,
			following: [ ...state.following, action.payload ]
		}

		case userTypes.FETCH_USERS_FAILURE:
		return{
			...state,
			userLists: [],
			error: action.payload
		}

		case userTypes.AUTHENTICATION_FAILURE:
		case userTypes.SIGN_OUT_FAILURE:
		case userTypes.SIGN_OUT_SUCCESS:
			return{
				...state,
				currentUser: null,
				userLists: [],
				following: [],
				followers: [],
				error: action.payload
			}

		default:
			return state
	}
}

export default userReducer
