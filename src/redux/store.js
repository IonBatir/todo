// src/redux/store.js
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers'
import thunk from 'redux-thunk'

export const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk)));