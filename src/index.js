import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
// import store from './mainStore';
import { App } from './connected_components/App.react';
const createBrowserHistory = require('history/lib/createBrowserHistory')

const routes = (
	<Router history={createBrowserHistory()}>
		<Route path='/' component={App} />
	</Router>
);


// <Provider store={store}> routes </Provider>

render(
	<App text='loaded' />, 
	document.getElementById('root')
);