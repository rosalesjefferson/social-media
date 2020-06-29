import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth } from '../../firebase/firebase.utils'

import userTypes from './user.types'

import { 
		authenticationSuccess,
		signOutSuccess,
		authenticationFailure,
		signOutFailure,

		fetchUsersSuccess,
		fetchUsersFailure,

		followUserSuccess,
		followUserFailure,

		fetchFollowingSuccess,
		fetchFollowingFailure,

		fetchFollowersSuccess,
		fetchFollowersFailure,

		editBioFeaturedSuccess,
		editBioFeaturedFailure,

		editProfileSuccess,
		editProfileFailure
	} from './user.actions'

import { 
		createUserProfile, 
		getCurrentUser, 
		getFollowing, 
		getFollowers,
		getAllUsers, 
		userToFollowAndUnfollow,
		getUserImageUrl,
		bioFeaturedToUpdate,
		updateProfileInfo,
		getTimelineFollowing,
		getTimelineFollowers
	} from '../../firebase/firebase.utils.user'

export function* userProfile(currentUserInfo, otherUserInfo){
	try{
		const userReference = yield call(createUserProfile, currentUserInfo, { ...otherUserInfo })
		const following = yield call(getFollowing, userReference)
		const followers = yield call(getFollowers, userReference)
		const userSnapshot = yield userReference.get();
		yield put(authenticationSuccess({ UID: userSnapshot.id, ...userSnapshot.data(),  following: [ ...following ], followers: [ ...followers ]  }))
	}catch(err){
		yield put(authenticationFailure(err.message))
	}
}

export function* isAuthenticated(){
	try{
		const user = yield getCurrentUser();
		if(!user){
			return
		}else{
			yield userProfile(user)
		}

	}catch(err){
		yield put(authenticationFailure(err.message))
	}
}

export function* signIn({ payload: { email, password } }){
	try{
		const { user } = yield auth.signInWithEmailAndPassword(email, password)
		yield userProfile(user)
	}catch(err){
		yield put(authenticationFailure(err.message))
	}
}

export function* signUp({ payload: { firstName, lastName, email, password } }){
	const currentUserAvatarUrl = 'https://www.cbns.org.au/wp-content/uploads/2017/05/img_placeholder_avatar.jpg'
 	try{
		const { user } = yield auth.createUserWithEmailAndPassword(email, password)
		yield userProfile(user, { firstName, lastName, currentUserAvatarUrl })
 	}catch(err){
		 yield put(authenticationFailure(err.message))
 	}
}

export function* signOut(){
	try{
		yield auth.signOut()
		yield put(signOutSuccess())
	}catch(err){
		yield put(signOutFailure(err.message))
	}
}

export function* fetchUsers(){
	try{
		const users = yield getAllUsers()
		yield put(fetchUsersSuccess(users))
	}catch(err){
		yield put(fetchUsersFailure(err.message))
	}
}

export function* followAndUnfollow(payload){
	try{
		const toFollowOrUnfollow = yield call(userToFollowAndUnfollow, payload)
		return toFollowOrUnfollow
	}catch(err){
		return err
	}

}

export function* followUser({ payload }){
	try{
		const toFollowOrUnfollow = yield call(followAndUnfollow, payload)
		yield put(followUserSuccess(toFollowOrUnfollow))
	}catch(err){
		yield put(followUserFailure(err.message))
	}
}

export function* editBioFeatured({ payload: { bioEdit, timelineUID, featuredPhotoEdit, existingFeaturedPhoto } }){
	try{
		const userImageUrl = yield call(getUserImageUrl, featuredPhotoEdit)
		const users = yield call(bioFeaturedToUpdate, { bioEdit, timelineUID, userImageUrl, existingFeaturedPhoto })
		yield put(editBioFeaturedSuccess(users))
	}catch(err){
		yield put(editBioFeaturedFailure(err.message))
	}
}

export function* editProfile({ payload: { id, uFirstName, uLastName, uNickname, uHobbies, uAddress, uContactNumber, uBirthday, uGender, uEducation, uWork, profilePictureObject, coverPhotoObject, currentUserAvatarUrl, currentUserCoverUrl } }){
	try{
		const userProfileUrl = yield call(getUserImageUrl, profilePictureObject)
		const userCoverUrl = yield call(getUserImageUrl, coverPhotoObject)
		const users = yield call(updateProfileInfo, { id, uFirstName, uLastName, uNickname, uHobbies, uAddress, uContactNumber, uBirthday, uGender, uEducation, uWork, userProfileUrl, userCoverUrl, currentUserAvatarUrl, currentUserCoverUrl })
		yield put(editProfileSuccess(users))
		const currUser = yield getCurrentUser();
		yield userProfile(currUser)
	}catch(err){
		yield put(editProfileFailure(err.message))
	}
}

export function* fetchFollowing({ payload }){
	try{
		const following = yield call(getTimelineFollowing, payload)
		yield put (fetchFollowingSuccess(following))
	}catch(err){
		yield put(fetchFollowingFailure(err.message))
	}
}

export function* fetchFollowers({ payload }){
	try{
		const followers = yield call(getTimelineFollowers, payload)
		yield put (fetchFollowersSuccess(followers))
	}catch(err){
		yield put(fetchFollowersFailure(err.message))
	}
}

export function* onCheckUserSessionStart(){
	yield takeLatest(userTypes.CHECK_USER_SESSION_START, isAuthenticated)
}

export function* onSignInStart(){
	yield takeLatest(userTypes.SIGN_IN_START, signIn)
}

export function* onSignUpStart(){
	yield takeLatest(userTypes.SIGN_UP_START, signUp)
}

export function* onSignOutStart(){
	yield takeLatest(userTypes.SIGN_OUT_START, signOut)
}

export function* onFetchUsersStart() {
	yield takeLatest(userTypes.FETCH_USERS_START, fetchUsers)
}

export function* onFollowUserStart() {
	yield takeLatest(userTypes.FOLLOW_USER_START, followUser)
}

export function* onEditBioFeaturedStart(){
	yield takeLatest(userTypes.EDIT_BIO_FEATURED_START, editBioFeatured)
}

export function* onEditProfileStart(){
	yield takeLatest(userTypes.EDIT_PROFILE_START, editProfile)
}

export function* onFetchFollowingStart(){
	yield takeLatest(userTypes.FETCH_FOLLOWING_START, fetchFollowing)
}

export function* onFetchFollowersStart(){
	yield takeLatest(userTypes.FETCH_FOLLOWERS_START, fetchFollowers)
}

// export function* onEditProfileStart(){
// 	yield takeLatest(userTypes.EDIT_PROFLE_START, editProfile)
// }

// USER ROOT SAGAS
export function* userSagas() {
	yield all([
				call(onCheckUserSessionStart),
				call(onSignUpStart),
				call(onSignOutStart),
				call(onSignInStart),
				call(onFetchUsersStart),
				call(onFollowUserStart),
				call(onEditBioFeaturedStart),
				call(onEditProfileStart),
				call(onFetchFollowingStart),
				call(onFetchFollowersStart)
			])
}



// test's friend
// 4 & 5

// test2's friends
// 4, 3







/*
jefferson's friends
friend 1
friendID: 0AB25mJx5ReYnjIJjtGP8lmErYo2
email: lionelmessi@gmail.com
firstName: Lionel
lastName: Messi
userAvatarUrl: 

friend 2
friendID: 5LGRvqoSmhMOF9HL7iUxnEpNHjf2
email: lebronjames@gmail.com
firstName: Lebron
lastName: James
userAvatarUrl: 

friend 3
friendID: DelJL42HnZaWwpWCAEcIPVjfes52
email: abedyusop@gmail.com
firstName: Abed
lastName: Yusop
userAvatarUrl: 

friend 4
friendID: xZLMRjY8UNTHtreiGi2qiPf6NYH2
email: michaeljordan@gmail.com
firstName: Michael
lastName: Jordan
userAvatarUrl: 

*/