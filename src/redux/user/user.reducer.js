import userTypes from './user.types'
const INITIAL_STATE = {
	currentUser: null,
	friends: [],
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
			friends: [ ...state.friends, ...action.payload ]
		}

		case userTypes.AUTHENTICATION_FAILURE:
		case userTypes.SIGN_OUT_FAILURE:
		case userTypes.SIGN_OUT_SUCCESS:
		case userTypes.FETCH_USERS_FAILURE:
			return{
				...state,
				error: action.payload
			}

		default:
			return state
	}
}

export default userReducer
