import { createReducer, makeActionCreator } from "../utils";

// ACTION TYPES

const SESSION_CREATE_REQUEST = 'vizyul/session/SESSION_CREATE_REQUEST';
const SESSION_CREATE_SUCCESS = 'vizyul/session/SESSION_CREATE_SUCCESS';
const SESSION_CREATE_FAILURE = 'vizyul/session/SESSION_CREATE_FAILURE';

const SESSION_RETRIEVE_REQUEST = 'vizyul/session/SESSION_RETRIEVE_REQUEST';
const SESSION_RETRIEVE_SUCCESS = 'vizyul/session/SESSION_RETRIEVE_SUCCESS';
const SESSION_RETRIEVE_FAILURE = 'vizyul/session/SESSION_RETRIEVE_FAILURE';

const SESSION_RENAME_REQUEST = 'vizyul/session/SESSION_RENAME_REQUEST';
const SESSION_RENAME_SUCCESS = 'vizyul/session/SESSION_RENAME_SUCCESS';
const SESSION_RENAME_FAILURE = 'vizyul/session/SESSION_RENAME_FAILURE';

const SESSION_CLEAR = 'vizyul/session/SESSION_CLEAR';

// REDUCER

const initialState = {};

const reducer = createReducer(initialState, {

});

// ACTIONS

export function createSession() {
  return {
    types: [
      SESSION_CREATE_REQUEST,
      SESSION_CREATE_SUCCESS,
      SESSION_CREATE_FAILURE,
    ],
    callApi: () => axios.post('/api/session/create', {}),
    payload: {},
  };
};

export function renameSession(oldName, newName) {
  return {
    types: [
      SESSION_RENAME_REQUEST,
      SESSION_RENAME_SUCCESS,
      SESSION_RENAME_FAILURE,
    ],
    callApi: () => axios.patch('/api/session/rename', {}),
    payload: { oldName, newName },
  };
};

export function getSessionData(sessionId) {
  return {
    types: [
      SESSION_RETRIEVE_REQUEST,
      SESSION_RETRIEVE_SUCCESS,
      SESSION_RETRIEVE_FAILURE,
    ],
    callApi: () => axios.get(`/api/session/${sessionId}`),
    payload: { sessionId },
  }
};

export const clearSession = makeActionCreator(SESSION_CLEAR);

// SELECTORS

export const getSessionId = state => state.session.id;

export const getSessionName = state => state.session.name;

export const getSessionMode = state => state.session.mode;