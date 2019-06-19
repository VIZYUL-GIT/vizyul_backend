import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import _ from 'underscore';

import { api } from '../state/api-middleware';
import cardinalApp from '../state';

export const logger = () => next => (action) => {
  // console.info('dispatching', JSON.stringify(action));
  const result = next(action);
  // console.log('next state', JSON.stringify(store.getState()));
  // console.groupEnd(action.type);
  return result;
};

const middlewares = [logger, api, thunk];
const mockStore = configureMockStore(middlewares);

export const sync = fn => async (...args) => {
  try {
    const result = await fn(args);
    return () => result;
  } catch (e) {
    return () => { throw e; };
  }
};

export const create = (initialState = {}) => {
  const store = mockStore(Object.assign({}, cardinalApp(undefined, {}), initialState));
  const next = jest.fn();
  const invoke = async action => api(store)(next)(action);
  return { store, next, invoke };
};

export const createThunk = (initialState = {}) => {
  const store = mockStore(Object.assign({}, cardinalApp(undefined, {}), initialState));
  const invoke = async action => store.dispatch(action);
  const next = jest.fn();
  return { store, invoke, next };
};

// Determines whether the first array has all the elements of b in the same order
// as specified in b.
export const hasAllActions = (a, b) => {
  if (!a || !b) { return false; }

  let matched = 0;
  let index = 0;
  const notMatched = [];

  for (let x = 0; x < b.length; x += 1) {
    for (let y = index; y < a.length; y += 1) {
      if (_.isEqual(b[x], a[y])) {
        matched += 1;
        index = y + 1;
        break;
      } else {
        notMatched.push(a[y]);
      }
    }
  }

  // const result = matched === b.length;
  //
  // if (!result && notMatched.length) {
  //   console.log(`Actions: ${JSON.stringify(a)}`); // keep
  // }
  // if (a.length !== b.length) {
  //   console.log(`Actions not matched: ${JSON.stringify(notMatched)}`); // keep
  // }
  //
  return matched === b.length;
};