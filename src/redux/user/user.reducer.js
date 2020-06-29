import userTypes from './user.types'
import { uniqueUsers } from './user.utils'

const INITIAL_STATE = {
	currentUser: null,
	userLists: [],
	timelineFollowing: [],
	timelineFollowers: [],
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
			userLists: [ ...state.userLists, ...uniqueUsers(state.userLists, action.payload) ],
			// following: [ ...state.following, ...action.payload.following ]
		}

		case userTypes.EDIT_BIO_FEATURED_SUCCESS:
		case userTypes.EDIT_PROFILE_SUCCESS:
		return{
			...state,
			userLists: [ ...action.payload ]
		}

		case userTypes.FETCH_FOLLOWING_SUCCESS:
		return{
			...state,
			timelineFollowing: [ ...state.timelineFollowing, ...action.payload ]
		}

		case userTypes.FETCH_FOLLOWING_FAILURE:
		return{
			...state,
			error: action.err
		}


		case userTypes.FETCH_FOLLOWERS_SUCCESS:
		return{
			...state,
			timelineFollowers: [ ...state.timelineFollowers, ...action.payload ]
		}

		case userTypes.FETCH_FOLLOWERS_FAILURE:
		return{
			...state,
			error: action.err
		}

		case userTypes.FOLLOW_USER_SUCCESS:
		return{
			...state,
			// following: [ ...state.following, action.payload ]
			currentUser: { ...state.currentUser,  following: [...state.currentUser.following, action.payload]}

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
