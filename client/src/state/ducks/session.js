import axios from 'axios';
import { createReducer, makeActionCreator, updateObject } from "../utils";

import { concurrent } from '../axios-utils';
import { LOGOUT_USER_SUCCESS } from './user';

// axios.interceptors.request.use((request) => {
//   console.log('starting request:', request);
//   return request;
// });

const PAGE_SIZE = 20;

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

const FILE_UPLOAD_REQUEST = 'vizyul/file/FILE_UPLOAD_REQUEST';
const FILE_UPLOAD_SUCCESS = 'vizyul/file/FILE_UPLOAD_SUCCESS';
const FILE_UPLOAD_FAILURE = 'vizyul/file/FILE_UPLOAD_FAILURE';

// REDUCER

const initialState = {};

const reducer = createReducer(initialState, {
  [SESSION_CREATE_SUCCESS]: (state, action) => updateObject(state, {
    sessionAppId: action.response.session_app_id,
    sessionName: action.response.session_name,
  }),
  [FILE_UPLOAD_SUCCESS]: (state, action) => {
    console.log('file_upload_success returned action', action);
    return updateObject(state, {
      sessionAppId: action.response.sessionAppId,
      uploads: action.response.uploads,
    });
  },
  [SESSION_CLEAR]: () => initialState,
  [LOGOUT_USER_SUCCESS]: () => initialState,
});

export default reducer;

// ACTIONS

export function createSession(userAppId) {
  return {
    types: [
      SESSION_CREATE_REQUEST,
      SESSION_CREATE_SUCCESS,
      SESSION_CREATE_FAILURE,
    ],
    callApi: () => axios.post('/api/session/create', { userAppId }),
    payload: {},
  };
};

export function renameSession(userAppId, oldName, newName) {
  return {
    types: [
      SESSION_RENAME_REQUEST,
      SESSION_RENAME_SUCCESS,
      SESSION_RENAME_FAILURE,
    ],
    callApi: () => axios.patch('/api/session/rename', { userAppId, oldName, newName }),
    payload: { oldName, newName },
  };
};

export function getSessionData(sessionAppId) {
  return {
    types: [
      SESSION_RETRIEVE_REQUEST,
      SESSION_RETRIEVE_SUCCESS,
      SESSION_RETRIEVE_FAILURE,
    ],
    callApi: () => axios.get(`/api/session/${sessionAppId}`),
    payload: { sessionAppId },
  }
};

export const clearSession = makeActionCreator(SESSION_CLEAR);

export function uploadFiles(userAppId, files) {
  return {
    types: [
      FILE_UPLOAD_REQUEST,
      FILE_UPLOAD_SUCCESS,
      FILE_UPLOAD_FAILURE,
    ],
    // shouldCallApi: state => !(state.rep.verified && state.rep.repId === repId),
    callApi: () =>  {
      return axios.post('/api/session/create', { userAppId})
        .then((session) => {
          const sessionAppId = session.data.sessionAppId;
          
          const uploaders = files.map(file => {
            const formData = new FormData();
      
            formData.set('sessionAppId', sessionAppId);
            formData.append("file", file);
            formData.append("file_name", file.name);
      
            return axios.post("/api/file/up", formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            })
              .then(resp => {
                return { ...resp.data.response, file: file.name };
              });
          });

          return concurrent(uploaders)
            .then(uploads => {
              const result = { uploads, sessionAppId };
              return result;
            });
        });
    },
    payload: { files },
  };
}

// SELECTORS

export const getSessionAppId = state => state.session.sessionAppId;

export const getSessionName = state => state.session.name;

export const getSessionMode = state => state.session.mode;

export const getUploads = state => state.session.uploads;