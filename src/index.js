import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import { keyboardKeyPress, mouseUp, resizeWindow, keyboardKeyDown, keyboardKeyUp } from './actions'
import { tryParseBigNumber } from './services/util';

/**
 * middleware to save memory changes to localStorage so when you refresh the memory value persists
 */
let M = tryParseBigNumber(localStorage.getItem('M'), 0);
const memoryToLocalStorageMiddleware = function(middlewareAPI) {
  return function(next) {
    return function(action) {
      const currM = middlewareAPI.getState().calculatorState.memory;
      if(M.comparedTo(currM) !== 0) {
        M = currM;
        localStorage.setItem('M', M.toNumber());
      }
      return next(action);
    }
  }
};
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, memoryToLocalStorageMiddleware));

/**
 * global dispatchers
 */
document.addEventListener('mouseup', function() {
  store.dispatch(mouseUp());
});
window.addEventListener('resize', function() {
  store.dispatch(resizeWindow());
});
document.addEventListener('keypress', function(e) {
  let keyCode = e.keyCode !== undefined ? e.keyCode : (e.which !== undefined ? e.which : e.key.charCodeAt(0));
  store.dispatch(keyboardKeyPress(keyCode));
});
document.addEventListener('keydown', function(e) {
  let keyCode = e.keyCode !== undefined ? e.keyCode : (e.which !== undefined ? e.which : e.key.charCodeAt(0));
  store.dispatch(keyboardKeyDown(keyCode));
});
document.addEventListener('keyup', function(e) {
  let keyCode = e.keyCode !== undefined ? e.keyCode : (e.which !== undefined ? e.which : e.key.charCodeAt(0));
  if(keyCode === 27 || keyCode === 8) {  // escape key and backspace key
    store.dispatch(keyboardKeyPress(keyCode));
  }
  else {
    store.dispatch(keyboardKeyUp(keyCode));
  }
});

/**
 * bootstrap app
 */
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
