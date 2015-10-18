import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import alertify from 'alertifyjs';
import faker from 'faker';


import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'

// reducer
import { createStore, combineReducers, applyMiddleware } from 'redux';

function count(state = 0, action) {
	switch (action.type) {
		case 'increment':
			
			return state + 1

		default:
			return state
	}
}


function message(state = '', action) {
	switch (action.type) {
		case 'alert':
			alertify.alert('hello' + state);
			return 'HELLO!'
		case 'clear':
			return ''
		default:
			return state
	}
}


const counter = combineReducers({
	count,
	message
});


const loggerMiddleware = createLogger();


const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware, 
  loggerMiddleware 
)(createStore);


let store = createStoreWithMiddleware(counter);


console.log( store.getState() );

// store.subscribe( () => 
// );



function thunk () {
	return function (dispatch) {
		dispatch({type: 'increment'});

	}
}


// import { connect } from 'react-redux';

class App extends Component {
  render() {
  	const { dispatch } = this.props;
  	if (this.props.message != '') {
  		// alertify.alert(this.props.message);
  		// dispatch({type: 'clear'});
  	}
    return (
      <div>
        <h1> Love ya </h1>
        {this.props.count} <br/>
        <button onClick={ () => dispatch({type: 'increment'}) }> increment </button>
        <button onClick={ this.increment }> alert </button>
      </div>
    );
  }

  increment = () => {
  	store.dispatch(thunk());
  	store.dispatch({type: 'alert'});
		// alertify.alert('Hi!');
  	
  }
  
  // componentWillUpdate (nextProps) {
  // 	if (nextProps.message != '') {
  // 		alertify.alert(nextProps.message);
  // 		console.log(this.props);
  // 		store.dispatch({type: 'clear'});
  // 	}
  	
  // }

  alert = () => {
  	alertify.alert('Hi!');
  }

}


function update (state) {
	return {
		count: state.count,
		message: state.message
	};
}

const AppContainer = connect(update)(App);

render(
	<Provider store={store}>
		<AppContainer />
	</Provider >


	, document.getElementById('root'));
