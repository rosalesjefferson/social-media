import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'

// MIDDLE WARE IS LIKE A LITTLE TUNNEL THAT INTERCEPTS OUR ACTION BEFORE GOING TO REDUCER AND MODIFY THAT OR ADD THINGS
// Middleware are pretty much a function and it's like a tunnel between action and root reducer that receives actions in and do something with them and then pass them out in to the reducer
// we need to add middleware to our store so whenever actions gets fired or dispatch, we can catch them and display them and then moves it along / proceed to our reducer.

// the middleware that we're talking about is this logger library
// logger library catches the actions and console log it out for us. This is very handy middleware because we can monitor what's going in in our reducer. This is something that is nice for us to use when debugging our redux code

import combineReducers from './root-reducer'

const middlewares = [logger]

// The middleware that the store is expecting from redux is going to be an array that's why we put logger inside of middlewares array because we can pass lot of value not only the logger
// createStore is a function that gets both root reducer and also the return value of applyMiddleware(). 
//The applyMiddleware() spreads all of the values in middlewares that has a diffrent value that comes from exp. loggers that catches all of the actions so it can console log it out for us or redux saga.
const store = createStore(applyMiddleware(combineReducers, ...middlewares))

// we will export store and import store to our index.js and pass it to our provider so we can use store/reducer in our component.
export default store