import axios from "axios";
import _ from 'underscore';

import { createReducer, makeActionCreator, updateObject } from "../utils";
import { LOGOUT_USER_SUCCESS } from "./user";

// ACTION TYPES

const TABLEAU_SERVER_CREATE_REQUEST = 'vizyul/tableau/TABLEAU_SERVER_CREATE_REQUEST';
const TABLEAU_SERVER_CREATE_SUCCESS = 'vizyul/tableau/TABLEAU_SERVER_CREATE_SUCCESS';
const TABLEAU_SERVER_CREATE_FAILURE = 'vizyul/tableau/TABLEAU_SERVER_CREATE_FAILURE';

const TABLEAU_SERVER_SIGNIN_REQUEST = 'vizyul/tableau/TABLEAU_SERVER_SIGNIN_REQUEST';
const TABLEAU_SERVER_SIGNIN_SUCCESS = 'vizyul/tableau/TABLEAU_SERVER_SIGNIN_SUCCESS';
const TABLEAU_SERVER_SIGNIN_FAILURE = 'vizyul/tableau/TABLEAU_SERVER_SIGNIN_FAILURE';

const TABLEAU_SERVER_WORKBOOKS_REQUEST = 'vizyul/tableau/TABLEAU_SERVER_WORKBOOKS_REQUEST';
const TABLEAU_SERVER_WORKBOOKS_SUCCESS = 'vizyul/tableau/TABLEAU_SERVER_WORKBOOKS_SUCCESS';
const TABLEAU_SERVER_WORKBOOKS_FAILURE = 'vizyul/tableau/TABLEAU_SERVER_WORKBOOKS_FAILURE';

const TABLEAU_SERVER_LIST_REQUEST = 'vizyul/tableau/TABLEAU_SERVER_LIST_REQUEST';
const TABLEAU_SERVER_LIST_SUCCESS = 'vizyul/tableau/TABLEAU_SERVER_LIST_SUCCESS';
const TABLEAU_SERVER_LIST_FAILURE = 'vizyul/tableau/TABLEAU_SERVER_LIST_FAILURE';

const TABLEAU_SERVER_CLEAR_ALL = 'vizyul/tableau/TABLEAU_SERVER_CLEAR_ALL';

// REDUCER

const initialState = { servers: [] };

const reducer = createReducer(initialState, {
  [TABLEAU_SERVER_CREATE_SUCCESS]: (state, action) => {
    console.log('tableau.state=', state)
    const { server_app_id, server_host, server_content_url } = action.response;
    return ({
      ...state,
      servers: [
        ...state.servers,
        {
          serverId: server_app_id,
          host: server_host,
          contentUrl: server_content_url,
        }
      ],
    });
  },
  [TABLEAU_SERVER_SIGNIN_SUCCESS]: (state, action) => updateObject(state, {
    currentServer: state.servers.find(server => server.serverId === action.serverAppId),
  }),
  [TABLEAU_SERVER_SIGNIN_FAILURE]: state => _.omit(state, ['currentServer']),
  [TABLEAU_SERVER_CLEAR_ALL]: () => initialState,
  [LOGOUT_USER_SUCCESS]: () => initialState,
});

export default reducer;

// ACTIONS

export function addTableauServer(host, port, name, password, contentUrl) {
  return {
    types: [
      TABLEAU_SERVER_CREATE_REQUEST,
      TABLEAU_SERVER_CREATE_SUCCESS,
      TABLEAU_SERVER_CREATE_FAILURE,
    ],
    callApi: () => axios.post('/api/tableau/server', {
      host, port, name, password, contentUrl,
    }),
    payload: {
      host, port, name, contentUrl,
    },
  };
}

export function getTableauServers() {
  return {
    types: [
      TABLEAU_SERVER_LIST_REQUEST,
      TABLEAU_SERVER_LIST_SUCCESS,
      TABLEAU_SERVER_LIST_FAILURE,
    ],
    callApi: () => axios.get('/api/tableau/servers', {
    }),
    payload: {
    },
  };
}

export function tableauSignin(serverAppId) {
  return {
    types: [
      TABLEAU_SERVER_SIGNIN_REQUEST,
      TABLEAU_SERVER_SIGNIN_SUCCESS,
      TABLEAU_SERVER_SIGNIN_FAILURE,
    ],
    callApi: () => axios.post('/api/tableau/signin', {
      serverAppId,
    }),
    payload: {
      serverAppId,
    },
  };
}

export function tableauWorkbooks(serverAppId) {
  if (!serverAppId) {
    throw new Error(500, `Missing or invalid serverAppId: ${serverAppId}`);
  }
  return {
    types: [
      TABLEAU_SERVER_WORKBOOKS_REQUEST,
      TABLEAU_SERVER_WORKBOOKS_SUCCESS,
      TABLEAU_SERVER_WORKBOOKS_FAILURE,
    ],
    callApi: () => axios.get('/api/tableau/workbooks', {
      params: {
        serverAppId,
      },
    }),
    payload: {
      serverAppId,
    },
  };
}

export const clearTableauServers = makeActionCreator(TABLEAU_SERVER_CLEAR_ALL); 

// SELECTORS

export const getServers = state => state.tableau.servers;

export const getCurrentServer = state => state.tableau.currentServer;
