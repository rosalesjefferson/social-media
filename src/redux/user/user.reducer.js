import userTypes from './user.types'
import { uniqueUsers, uniqueFollowing, removeUnfollow } from './user.utils'

const INITIAL_STATE = {
	currentUser: null,
	userLists: [],
	timelineFollowing: [],
	timelineFollowers: [],
	isFollowingFetching: false,
	isFollowersFetching: false,
	isUsersFetching: true,
	error: null
}

const userReducer = (state=INITIAL_STATE, action) =>{
	switch(action.type){
		case userTypes.AUTHENTICATION_SUCCESS:
			return {
				...state,
				currentUser: action.payload
			}
		case userTypes.FETCH_USERS_START:
		return{
			...state,
			isUsersFetching: false
		}

		case userTypes.FETCH_USERS_SUCCESS:
		return{
			...state,
			isUsersFetching: true,
			userLists: [ ...state.userLists, ...uniqueUsers(state.userLists, action.payload) ],
		}

		case userTypes.FETCH_FOLLOWING_START:
		return{
			...state,
			isFollowingFetching: false
		}

		case userTypes.FETCH_FOLLOWING_SUCCESS:
		return{
			...state,
			timelineFollowing: [ ...action.payload ],
			isFollowingFetching: true
		}

		case userTypes.FETCH_FOLLOWERS_START:
		return{
			...state,
			isFollowersFetching: false
		}

		case userTypes.FETCH_FOLLOWERS_SUCCESS:
		return{
			...state,
			timelineFollowers: [ ...action.payload ],
			isFollowersFetching: true
		}

		case userTypes.EDIT_BIO_FEATURED_SUCCESS:
		case userTypes.EDIT_PROFILE_SUCCESS:
		return{
			...state,
			userLists: [ ...action.payload ]
		}

		case userTypes.FOLLOW_USER_SUCCESS:
		return{
			...state,
			timelineFollowing: [ ...uniqueFollowing(state.timelineFollowing, action.payload) ],
			currentUser: { ...state.currentUser,  following: [ ...state.currentUser.following, action.payload]}
		}

		case userTypes.UNFOLLOW_USER_SUCCESS:
		return{
			...state,
			timelineFollowing: [ ...uniqueFollowing(state.timelineFollowing, action.payload) ],
			currentUser: { ...state.currentUser,  following: [ ...removeUnfollow(state.currentUser.following, action.payload) ]}
		}

		case userTypes.FETCH_FOLLOWING_FAILURE:
		return{
			...state,
			isFollowingFetching: false,
			error: action.err
		}

		case userTypes.FETCH_FOLLOWERS_FAILURE:
		return{
			...state,
			error: action.err
		}

		case userTypes.FETCH_USERS_FAILURE:
		return{
			...state,
			isUsersFetching: false,
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
