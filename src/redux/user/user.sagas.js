import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth } from '../../firebase/firebase.utils'

import userTypes from './user.types'

import { 
		authenticationSuccess,
		signOutSuccess,
		authenticationFailure,
		signOutFailure
	} from './user.actions'

import { createUserProfile, getCurrentUser, getFriendLists } from '../../firebase/firebase.utils.user'

export function* userProfile(currentUserInfo, otherUserInfo){
	try{
		const userDocReference = yield call(createUserProfile, currentUserInfo, { ...otherUserInfo })
		const friendLists = yield call(getFriendLists, userDocReference)
		
		const userSnapshot = yield userDocReference.get();

		yield put(authenticationSuccess({ id: userSnapshot.id, ...userSnapshot.data(),  friends: [ ...friendLists ]  }))
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
 	try{
		const { user } = yield auth.createUserWithEmailAndPassword(email, password)
		yield userProfile(user, { firstName, lastName })
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