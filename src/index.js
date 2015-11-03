import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { App } from './connected_components/App.react';
import { AboutPage } from './pure_components/AboutPage.react';
const createBrowserHistory = require('history/lib/createBrowserHistory')

const routes = (
	<Router>
		<Route path='/' component={AboutPage} />
		<Route path='/play' component={App} />
	</Router>
);

render(
	routes, 
	document.getElementById('root')
);