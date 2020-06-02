import userTypes from './user.types'
const INITIAL_STATE = {
	currentUser: null,
	error: null
}

const userReducer = (state=INITIAL_STATE, action) =>{
	switch(action.type){
		case userTypes.AUTHENTICATION_SUCCESS:
			return {
				...state,
				currentUser: action.payload
			}

		case userTypes.AUTHENTICATION_FAILURE:
		case userTypes.SIGN_OUT_FAILURE:
		case userTypes.SIGN_OUT_SUCCESS:
			return{
				...state,
				currentUser: null,
				error: action.payload
			}

		default:
			return state
	}
}

export default userReducer
