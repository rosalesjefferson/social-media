import userTypes from './user.types'

// CHECK USER SESSIONS
export const checkUserSessionStart = () =>({
	type: userTypes.CHECK_USER_SESSION_START
})

// SIGN IN START ACTIONS
export const signInStart = (userCredentials) =>({
	type: userTypes.SIGN_IN_START,
	payload: userCredentials
})

// SIGN UP START ACTIONS
export const signUpStart = (userCredentials) =>({
	type: userTypes.SIGN_UP_START,
	payload: userCredentials
})

// AUTHENTICATION SUCCESS & FAILURE ACTIONS
export const authenticationSuccess = (userCredentials) =>({
	type: userTypes.AUTHENTICATION_SUCCESS,
	payload: userCredentials
})
export const authenticationFailure = (userCredentials) => ({
	type: userTypes.AUTHENTICATION_FAILURE,
	payload: userCredentials
})


// SIGN OUT ACTIONS
export const signOutStart = () =>({
	type: userTypes.SIGN_OUT_START
})
export const signOutSuccess = () =>({
	type: userTypes.SIGN_OUT_SUCCESS
})
export const signOutFailure = () =>({
	type: userTypes.SIGN_OUT_FAILURE
})


// FETCH USERS ACTION

export const fetchUsersStart = () =>({
	type: userTypes.FETCH_USERS_START
})

export const fetchUsersSuccess = (users) =>({
	type: userTypes.FETCH_USERS_SUCCESS,
	payload: users
})

export const fetchUsersFailure = (err) =>({
	type: userTypes.FETCH_USERS_FAILURE,
	payload: err
})