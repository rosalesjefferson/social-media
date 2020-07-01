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


// FOLLOW USER START

export const followUserStart = (data) =>({
	type: userTypes.FOLLOW_USER_START,
	payload: data
})

export const followUserSuccess = (data) =>({
	type: userTypes.FOLLOW_USER_SUCCESS,
	payload: data
})

export const followUserFailure = (err) =>({
	type: userTypes.FOLLOW_USER_FAILURE,
	payload: err
})

// 

export const unfollowUserSuccess = data =>({
	type: userTypes.UNFOLLOW_USER_SUCCESS,
	payload: data
})



// Edit Bio and Feature photos

export const editBioFeaturedStart = (data) =>({
	type: userTypes.EDIT_BIO_FEATURED_START,
	payload: data
})

export const editBioFeaturedSuccess = (data) =>({
	type: userTypes.EDIT_BIO_FEATURED_SUCCESS,
	payload: data
})

export const editBioFeaturedFailure = (err) =>({
	type: userTypes.EDIT_BIO_FEATURED_FAILURE,
	payload: err
})

// Edit profile

export const editProfileStart = data =>({
	type: userTypes.EDIT_PROFILE_START,
	payload: data
})

export const editProfileSuccess = data =>({
	type: userTypes.EDIT_PROFILE_SUCCESS,
	payload: data
})

export const editProfileFailure = err =>({
	type: userTypes.EDIT_PROFILE_FAILURE,
	payload: err
})




// FETCH FOLLOWING

export const fetchFollowingStart = data =>({
	type: userTypes.FETCH_FOLLOWING_START,
	payload: data
})

export const fetchFollowingSuccess = data =>({
	type: userTypes.FETCH_FOLLOWING_SUCCESS,
	payload: data
})

export const fetchFollowingFailure = err =>({
	type: userTypes.FETCH_FOLLOWING_FAILURE,
	payload: err
})


// FETCH FOLLOWERS

export const fetchFollowersStart = data =>({
	type: userTypes.FETCH_FOLLOWERS_START,
	payload: data
})

export const fetchFollowersSuccess = data =>({
	type: userTypes.FETCH_FOLLOWERS_SUCCESS,
	payload: data
})

export const fetchFollowersFailure = err =>({
	type: userTypes.FETCH_FOLLOWERS_FAILURE,
	payload: err
})


