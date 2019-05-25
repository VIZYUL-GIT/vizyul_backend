import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';

import createStore from './create_store';
import api from './api-middleware';

import vizyulApp from './index';
import { loadState, saveState } from './local_storage';

const configureStore = (initialState) => {
  const persistedState = initialState || loadState();
  const store = createStore(
    vizyulApp,
    persistedState,
    [api, thunk],
  );

  // Migration: Redux logging middleware ommitted

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
};

export default configureStore;
