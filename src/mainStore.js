import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

// import mainReducer from './mainReducer';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	loggerMiddleware
)(createStore);

export const store = createStoreWithMiddleware; // consume mainReducer here 