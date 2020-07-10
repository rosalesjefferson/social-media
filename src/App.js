import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import { checkUserSessionStart } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'

import Header from './components/header/header.component'
import LoadingSpiner from './components/loading-spinner/loading-spinner.component'
import ErrorBoundary from './components/error-boundary/error-boundary.component'

import './App.css';

const Homepage = lazy(() => import('./pages/homepage/homepage.component'))
const Suggested = lazy(() => import('./pages/suggested/suggested.component'))
const Timeline = lazy(() => import('././pages/timeline/timeline.component'))
const SignInAndUp = lazy(() => import('./pages/auth/sign-in-and-up.component'))
const SignUp = lazy(() => import('./components/sign-up/sign-up.component'))

// import Homepage from './pages/homepage/homepage.component'
// import Suggested from './pages/suggested/suggested.component'
// import Timeline from './pages/timeline/timeline.component'
// import SignInAndUp from './pages/auth/sign-in-and-up.component'
// import SignUp from './components/sign-up/sign-up.component'


function App({ checkUserSessionStart, currentUser }) {
  useEffect(() =>{
    checkUserSessionStart()
  }, [checkUserSessionStart])
  return (
    <div className="App">
    	<Header />
    	<Switch>
        <ErrorBoundary>
          <Suspense fallback={ <LoadingSpiner substitution='true' />}>
            <Route exact path='/' component={ currentUser ? Homepage : SignInAndUp } />
            <Route path='/suggested' component={ currentUser ? Suggested : SignInAndUp } />
            <Route path='/timeline/:currentUID' component={ currentUser ? Timeline : SignInAndUp } />
            <Route 
                   path='/signin' 
                   render={ () => currentUser ? (<Redirect to='/' />) : (<SignInAndUp />) } 
            />
            <Route 
                   path='/signup' 
                   render={ () => currentUser ? (<Redirect to='/' />) : (<SignUp />) } 
            />
          </Suspense>
        </ErrorBoundary>
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

