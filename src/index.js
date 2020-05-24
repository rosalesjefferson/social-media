import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// router
import { BrowserRouter } from 'react-router-dom'
// BrowserRouter is a component that we wrap around our <App />. What this does is it give us all of the functionalities of routing. It allows us to use all of the functionalities of routing in our application
// route is component that takes a couple arguments like exact, path, component etc. These three are the most important. Component argument is the component that we want to render
// switch is needed if we use route. Just don't forget switch if you're using route

// redux
import { Provider } from 'react-redux'

// Provider is a component that we get from react-redux. It's a component that we will wrap around the entire application because we want our entire application to have access to store that we get in redux. It's the parent of everything inside of our component. It allows us to acces all of the things related to store that we're gonna put all of the actual code we wanna store on our redux. In short is a component and parent of all of our component.

import store from './redux/store'


// import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
	<Provider store={ store }>
	  <React.StrictMode>
	  	<BrowserRouter>
	   	 <App />
	  	</BrowserRouter>
	  </React.StrictMode>
	</Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
