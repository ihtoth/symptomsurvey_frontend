import {
  applyMiddleware, createStore, combineReducers, compose,
} from 'redux';
import { routerMiddleware, routerReducer as routing } from 'react-router-redux';
import _ from 'lodash';
import persistState from 'redux-localstorage';

import todo from './reducers/todo/reducer';

export const rootReducer = combineReducers({ routing, todo });

// The slicer returns a function that specifies which parts of the redux state will be persisted.
const slicer = paths => state => _.pick(state, paths);

const middlewares = history => [
  routerMiddleware(history),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

export default (history, initialState) => createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middlewares(history)),
    persistState(['todo.todos'], { slicer }),
  ),
);
