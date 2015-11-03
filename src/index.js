import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { App } from './connected_components/App.react';
const createBrowserHistory = require('history/lib/createBrowserHistory')

// const routes = (
// 	<Router history={createBrowserHistory()}>
// 		<Route path='/' component={App} />
// 	</Router>
// );

render(
	<App text='loaded' />, 
	document.getElementById('root')
);