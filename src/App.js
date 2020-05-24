import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Header from './components/header/header.component'
import Homepage from './pages/homepage/homepage.component'
import Signup from './pages/auth/signup/signup.component'

import './App.css';

function App() {
  return (
    <div className="App">
    	<Header />
    	<Switch>
	    	<Route exact path='/' component={ Homepage } />
	    	<Route path='/signup' component={ Signup } />
    	</Switch>
    </div>
  );
}

export default App;
