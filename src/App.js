import React, { useEffect } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import { checkUserSessionStart } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'

import Header from './components/header/header.component'
import Homepage from './pages/homepage/homepage.component'
import SignInAndUp from './pages/auth/sign-in-and-up.component'
import SignUp from './components/sign-up/sign-up.component'

import './App.css';

function App({ checkUserSessionStart, currentUser }) {
  useEffect(() =>{
    checkUserSessionStart()
  }, [checkUserSessionStart])
  return (
    <div className="App">
    	<Header />
    	<Switch>
        <Route exact path='/' component={ currentUser ? Homepage : SignInAndUp } />
        <Route 
               path='/signin' 
               render={ () => currentUser ? (<Redirect to='/' />) : (<SignInAndUp />) } 
        />
        <Route 
               path='/signup' 
               render={ () => currentUser ? (<Redirect to='/' />) : (<SignUp />) } 
        />

    	</Switch>
    </div>
  );
}

const mapsStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapsDispatchToProps = (dispatch) =>({
  checkUserSessionStart: () => dispatch(checkUserSessionStart())
})


export default connect(mapsStateToProps, mapsDispatchToProps)(App);


  
// <Route exact path='/' component={ currentUser ? Homepage : SignInAndUp } />
//         <Route 
//                path='/signin' 
//                render={ () => currentUser ? (<Redirect to='/' />) : (<SignInAndUp />) } 
//         />
//         <Route 
//                path='/signup' 
//                render={ () => currentUser ? (<Redirect to='/' />) : (<SignUp />) } 
//         />






        //  <Route 
        //        exact path='/' component={ Homepage } 
        // />
        // <Route 
        //        path='/signin' component={ SignInAndUp } 
        // />
        // <Route 
        //        path='/signup' component={ SignUp } 
        // />
