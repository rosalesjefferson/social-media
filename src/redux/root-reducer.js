//with persist
import { combineReducers } from 'redux'
// we need to persist reducer so we will import persistReducer 
import { persistReducer } from 'redux-persist'
// this is local storage not session storage
import storage from 'redux-persist/lib/storage'

// root reducer is the actual base reducer object that represents all of the state of our application. So these root reducer will end up being the actual code that combines all of our other states or reducers.
// if we wrote all of the  code related to state in our application in one file, it becomes really messy and hard to read. So it's better break the code up to its individual sections or reducer exp. userReducer, postReducer, todosReducer. All of the reducer that we're going to go into these root reducer.




// reducer is just a function that gets 2 properties. State object which represents the inital state and action that just an object that has a type and payload or a value that can be anything that we pass to the reducer so we can update our state.

// if we fire state for the first time, it's going to be nothing or empty because redux doesn't know we have any state when our app first initialize. When the actions gets fire, there's gonna be no state.

// const INITIAL_STATE{
// 	currentUser: null
// }

// we will set the default state of our state equals to INITIAL_STATE
// if state is undefine, meaning that it's not set, the value of state will become equal to INITIAL_STATE
// remember that null is a value. It's considered a valid value.
// sample state below
// const INITIAL_STATE{
// 	currentUser: null
// }

// const userReducer = (state=INITIAL_STATE, action) =>{
// 	switch(action.type){
// 		case 'SET_CURRENT_USER':
//  			// return { ..state, action.payload }
// 			return {
// 				...state,
// 				currentUser: action.payload
// 			}

// 		default:
// 			return state
// 	}
// }

// export default userReducer



// in order for us to combine all of the different reducers we made, we need to use a function called combineReducers that we get from redux library.
// we will put all of our different reducers inside combineReducers function
// we need to create our store.js file and store combineReducer so we can use all of our reducer in our component

import userReducer from './user/user.reducer'
import crudReducer from './crud/crud.reducer'

const persistConfig = {
	key: 'root',
	storage, 
	whitelist: ['user']
}

const rootReducer = combineReducers({
	user: userReducer,
	posts: crudReducer
})

export default persistReducer(persistConfig, rootReducer)

















// without persist
// import { combineReducers } from 'redux'
// // root reducer is the actual base reducer object that represents all of the state of our application. So these root reducer will end up being the actual code that combines all of our other states or reducers.
// // if we wrote all of the  code related to state in our application in one file, it becomes really messy and hard to read. So it's better break the code up to its individual sections or reducer exp. userReducer, postReducer, todosReducer. All of the reducer that we're going to go into these root reducer.




// // reducer is just a function that gets 2 properties. State object which represents the inital state and action that just an object that has a type and payload or a value that can be anything that we pass to the reducer so we can update our state.

// // if we fire state for the first time, it's going to be nothing or empty because redux doesn't know we have any state when our app first initialize. When the actions gets fire, there's gonna be no state.

// // const INITIAL_STATE{
// // 	currentUser: null
// // }

// // we will set the default state of our state equals to INITIAL_STATE
// // if state is undefine, meaning that it's not set, the value of state will become equal to INITIAL_STATE
// // remember that null is a value. It's considered a valid value.
// // sample state below
// // const INITIAL_STATE{
// // 	currentUser: null
// // }

// // const userReducer = (state=INITIAL_STATE, action) =>{
// // 	switch(action.type){
// // 		case 'SET_CURRENT_USER':
// //  			// return { ..state, action.payload }
// // 			return {
// // 				...state,
// // 				currentUser: action.payload
// // 			}

// // 		default:
// // 			return state
// // 	}
// // }

// // export default userReducer



// // in order for us to combine all of the different reducers we made, we need to use a function called combineReducers that we get from redux library.
// // we will put all of our different reducers inside combineReducers function
// // we need to create our store.js file and store combineReducer so we can use all of our reducer in our component

// import userReducer from './user/user.reducer'
// import crudReducer from './crud/crud.reducer'
// import toggleReducer from './toggle/toggle.reducer'

// export default combineReducers({
// 	user: userReducer,
// 	posts: crudReducer,
// 	toggle: toggleReducer
// })