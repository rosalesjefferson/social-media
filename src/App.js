import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Header from './components/header/header.component'
import Homepage from './pages/homepage/homepage.component'
import SignInAndUp from './pages/auth/sign-in-and-up.component'

import './App.css';

function App() {
  return (
    <div className="App">
    	<Header />
    	<Switch>
	    	<Route exact path='/' component={ Homepage } />
	    	<Route path='/signin' component={ SignInAndUp } />
    	</Switch>
    </div>
  );
}

export default App;
