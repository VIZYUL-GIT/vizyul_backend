import axios from 'axios';

import { createReducer, updateObject } from '../utils';

// ACTION TYPES

const REGISTER_USER_REQUEST = 'vizyul/user/REGISTER_USER_REQUEST';
const REGISTER_USER_SUCCESS = 'vizyul/user/REGISTER_USER_SUCCESS';
const REGISTER_USER_FAILURE = 'vizyul/user/REGISTER_USER_FAILURE';
const LOGIN_USER_REQUEST = 'vizyul/user/LOGIN_USER_REQUEST';
const LOGIN_USER_SUCCESS = 'vizyul/user/LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'vizyul/user/LOGIN_USER_FAILURE';
const LOGOUT_USER_REQUEST = 'vizyul/user/LOGOUT_USER_REQUEST';
const LOGOUT_USER_SUCCESS = 'vizyul/user/LOGOUT_USER_SUCCESS';
const LOGOUT_USER_FAILURE = 'vizyul/user/LOGOUT_USER_FAILURE';

// REDUCER

const initialState = {};

const reducer = createReducer(initialState, {
  [LOGIN_USER_SUCCESS]: (state, action) => {
    return updateObject(state, { 
      username: action.username, 
      userId: action.response.user.userId,
    });
  },
  [LOGOUT_USER_SUCCESS]: () => {
    return initialState;
  }
});

export default reducer;

// ACTIONS

export function registerUser(name, email, password) {
  return {
    types: [
      REGISTER_USER_REQUEST,
      REGISTER_USER_SUCCESS,
      REGISTER_USER_FAILURE,
    ],
    callApi: () => axios.post('/api/user/register', { name, email, password }),
    payload: {
      name,
      email,
    },
  }
};

export function loginUser(username, password) {
  return {
    types: [
      LOGIN_USER_REQUEST,
      LOGIN_USER_SUCCESS,
      LOGIN_USER_FAILURE,
    ],
    callApi: () => axios.post('/auth/login', { username, password }),
    payload: { username },
  };
};

export function logoutUser() {
  return {
    types: [
      LOGOUT_USER_REQUEST,
      LOGOUT_USER_SUCCESS,
      LOGOUT_USER_FAILURE,
    ],
    callApi: () => axios.post('/auth/logout'),
  };
};

// SELECTORS

export const getUsername = state => state.user.username;

export const getUserId = state => state.user.userId;

export const getAuthStatus = state => state.user.userId !== undefined;