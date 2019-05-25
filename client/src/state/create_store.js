import {
  createStore as reduxCreateStore,
  compose,
  applyMiddleware
} from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStore = (
  reducer,
  initialState,
  enhancers,
) => reduxCreateStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...enhancers)),
);

export default createStore;
