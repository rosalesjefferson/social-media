import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import Header from './components/header/Header.component'
import ErrorBoundary from './components/error-boundary/Error.boundary.component'
import LoadingSpinner from './components/loading-spinner/Loading-spinner.component'


import { selectCurrentUser } from './redux/user/user.selector'
import { checkUserSession } from './redux/user/user.actions'

import './App.css'

const HomePage = lazy(() => import('./pages/homepage/Homepage.component'))
const ShopPage = lazy(() => import('./pages/shop/Shop.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/Checkout.component'))
const SignInAndUpPage = lazy(() => import('./pages/authentication/Sign-in-sign-up.component'))

const App = ({ checkUserSessionDispatch, currentUser }) =>{
  useEffect(() => {
    checkUserSessionDispatch()
  }, [checkUserSessionDispatch])

  return (
    <div className="app">
      <Header/>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={ <LoadingSpinner /> }>
          	<Route exact path='/' component={ HomePage } />
            <Route path='/shop' component={ ShopPage } />
            <Route path='/checkout' component={ CheckoutPage } />
          	<Route 
              path='/signin' 
              render={ () => currentUser ? (<Redirect to='/' />) : (<SignInAndUpPage />) } 
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>	
    </div>
  ); 
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSessionDispatch: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);


