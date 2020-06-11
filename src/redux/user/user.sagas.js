import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth } from '../../firebase/firebase.utils'

import userTypes from './user.types'

import { 
		authenticationSuccess,
		signOutSuccess,
		authenticationFailure,
		signOutFailure
	} from './user.actions'

import { createUserProfile, getCurrentUser, getUserFriends } from '../../firebase/firebase.utils.user'

export function* userProfile(currentUserInfo, otherUserInfo){
	try{
		const userReference = yield call(createUserProfile, currentUserInfo, { ...otherUserInfo })
		const friends = yield call(getUserFriends, userReference)
		const userSnapshot = yield userReference.get();
		yield put(authenticationSuccess({ UID: userSnapshot.id, ...userSnapshot.data(),  friends: [ ...friends ]  }))
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
	const currentUserAvatarUrl = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues='
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
// USER ROOT SAGAS
export function* userSagas() {
	yield all([
				call(onCheckUserSessionStart),
				call(onSignUpStart),
				call(onSignOutStart),
				call(onSignInStart)
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