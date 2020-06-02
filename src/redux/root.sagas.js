import { all, call } from 'redux-saga/effects'

import { userSagas } from './user/user.sagas'
import { crudSagas } from './crud/crud.sagas'
// all takes an array of sagas if we want to run more than 1 saga
export default function* rootSaga() {
	yield all([
		call(userSagas),
		call(crudSagas)
	])
}
