import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';

import createStore from './create_store';
import api from './api-middleware';

import vizyulApp from './index';
import { loadState, saveState } from './local_storage';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    // if (/^@@redux-form/.test(action.type)) {
    //   // Ignore all Redux-Form-related actions
    //   return rawDispatch(action);
    // }
    console.group(action.type || action.types[0]);
    console.log('%c previous state', 'color: gray', store.getState()); // Keep
    console.log('%c action', 'color: blue', action); // Keep
    const result = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState()); // Keep
    console.groupEnd(action.type);
    return result;
  };
};

const configureStore = (initialState) => {
  const persistedState = initialState || loadState();
  const store = createStore(
    vizyulApp,
    persistedState,
    [api, thunk],
  );


  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
};

export default configureStore;
