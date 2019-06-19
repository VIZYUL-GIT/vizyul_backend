import axios from "axios";
import _ from 'underscore';

import { createReducer, makeActionCreator, updateObject, updateItemInArray } from "../utils";
import { LOGOUT_USER_SUCCESS } from "./user";

// ACTION TYPES

const TABLEAU_SERVER_CREATE_REQUEST = 'vizyul/tableau/TABLEAU_SERVER_CREATE_REQUEST';
const TABLEAU_SERVER_CREATE_SUCCESS = 'vizyul/tableau/TABLEAU_SERVER_CREATE_SUCCESS';
const TABLEAU_SERVER_CREATE_FAILURE = 'vizyul/tableau/TABLEAU_SERVER_CREATE_FAILURE';

const TABLEAU_SERVER_UPDATE_REQUEST = 'vizyul/tableau/TABLEAU_SERVER_UPDATE_REQUEST';
const TABLEAU_SERVER_UPDATE_SUCCESS = 'vizyul/tableau/TABLEAU_SERVER_UPDATE_SUCCESS';
const TABLEAU_SERVER_UPDATE_FAILURE = 'vizyul/tableau/TABLEAU_SERVER_UPDATE_FAILURE';

const TABLEAU_SERVER_SIGNIN_REQUEST = 'vizyul/tableau/TABLEAU_SERVER_SIGNIN_REQUEST';
const TABLEAU_SERVER_SIGNIN_SUCCESS = 'vizyul/tableau/TABLEAU_SERVER_SIGNIN_SUCCESS';
const TABLEAU_SERVER_SIGNIN_FAILURE = 'vizyul/tableau/TABLEAU_SERVER_SIGNIN_FAILURE';

const TABLEAU_SERVER_WORKBOOKS_REQUEST = 'vizyul/tableau/TABLEAU_SERVER_WORKBOOKS_REQUEST';
const TABLEAU_SERVER_WORKBOOKS_SUCCESS = 'vizyul/tableau/TABLEAU_SERVER_WORKBOOKS_SUCCESS';
const TABLEAU_SERVER_WORKBOOKS_FAILURE = 'vizyul/tableau/TABLEAU_SERVER_WORKBOOKS_FAILURE';

const TABLEAU_SERVER_LIST_REQUEST = 'vizyul/tableau/TABLEAU_SERVER_LIST_REQUEST';
const TABLEAU_SERVER_LIST_SUCCESS = 'vizyul/tableau/TABLEAU_SERVER_LIST_SUCCESS';
const TABLEAU_SERVER_LIST_FAILURE = 'vizyul/tableau/TABLEAU_SERVER_LIST_FAILURE';

const TABLEAU_SERVER_DATASOURCES_REQUEST = 'vizyul/tableau/TABLEAU_SERVER_DATASOURCES_REQUEST';
const TABLEAU_SERVER_DATASOURCES_SUCCESS = 'vizyul/tableau/TABLEAU_SERVER_DATASOURCES_SUCCESS';
const TABLEAU_SERVER_DATASOURCES_FAILURE = 'vizyul/tableau/TABLEAU_SERVER_DATASOURCES_FAILURE';

const TABLEAU_SERVER_CONNECTIONS_REQUEST = 'vizyul/tableau/TABLEAU_SERVER_CONNECTIONS_REQUEST';
const TABLEAU_SERVER_CONNECTIONS_SUCCESS = 'vizyul/tableau/TABLEAU_SERVER_CONNECTIONS_SUCCESS';
const TABLEAU_SERVER_CONNECTIONS_FAILURE = 'vizyul/tableau/TABLEAU_SERVER_CONNECTIONS_FAILURE';

const TABLEAU_CONNECTION_UPDATE_REQUEST = 'vizyul/tableau/TABLEAU_CONNECTION_UPDATE_REQUEST';
const TABLEAU_CONNECTION_UPDATE_SUCCESS = 'vizyul/tableau/TABLEAU_CONNECTION_UPDATE_SUCCESS';
const TABLEAU_CONNECTION_UPDATE_FAILURE = 'vizyul/tableau/TABLEAU_CONNECTION_UPDATE_FAILURE';

const TABLEAU_SERVER_CLEAR_ALL = 'vizyul/tableau/TABLEAU_SERVER_CLEAR_ALL';

const TABLEAU_SET_CURRENT_DATASOURCE = 'vizyul/tableau/TABLEAU_SET_CURRENT_DATASOURCE';
const TABLEAU_SET_CURRENT_DATASOURCE_CONNECTION = 'vizyul/tableau/TABLEAU_SET_CURRENT_DATASOURCE_CONNECTION';

// REDUCER

const initialState = {};

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
  [TABLEAU_SERVER_LIST_SUCCESS]: (state, action) => ({
    ...state,
    servers: action.response.servers,
    currentServer: undefined,
  }),
  [TABLEAU_SERVER_UPDATE_SUCCESS]: (state, action) => ({
    ...state,
    servers: updateItemInArray(
      state.servers,
      (server) => server.serverAppId === action.serverAppId,
      (server) => updateObject(server, {
        host: action.host,
        port: action.port,
        userName: action.name,
        contentUrl: action.contentUrl,
      })),
      currentServer: undefined,
  }),
  [TABLEAU_SERVER_DATASOURCES_SUCCESS]: (state, action) => ({
    ...state,
    datasources: action.response,
    currentDatasource: undefined,
    currentDatasourceConnection: undefined,
  }),
  [TABLEAU_SERVER_CONNECTIONS_SUCCESS]: (state, action) => ({
    ...state,
    datasources: updateItemInArray(
      state.datasources,
      item => item.id === action.datasourceId,
      item => ({ ...item, connections: action.response }),
    ),
  }),
  [TABLEAU_SERVER_WORKBOOKS_SUCCESS]: (state, action) => {
    return ({
      ...state,
      workbooks: action.response,
    });
  },
  [TABLEAU_SERVER_SIGNIN_SUCCESS]: (state, action) => updateObject(state, {
    currentServer: state.servers.find(server => server.serverId === action.serverAppId),
  }),
  [TABLEAU_SET_CURRENT_DATASOURCE]: (state, action) => {
    const found = state.datasources.find(ds => ds.id === action.datasourceId);
    console.log('tableau_set_current_datasource', found, found.connections);
    return updateObject(state, {
      currentDatasource: found,
      ...found && { currentDatasourceConnection: (found.connections || [])[0] }
    });
  },
  [TABLEAU_SET_CURRENT_DATASOURCE_CONNECTION]: (state, action) => {
    const found = ((state.currentDatasource || {}).connections || [])
      .find(c => c.id === action.connectionId);

    return updateObject(state, {
      currentDatasourceConnection: found,
    });
  },
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

export function updateTableauServer(serverAppId, host, port, name, password, contentUrl) {
  console.log('updating with ', serverAppId);
  return {
    types: [
      TABLEAU_SERVER_UPDATE_REQUEST,
      TABLEAU_SERVER_UPDATE_SUCCESS,
      TABLEAU_SERVER_UPDATE_FAILURE,
    ],
    callApi: () => axios.patch('/api/tableau/server/update', {
      serverAppId, host, port, name, password, contentUrl,
    }),
    payload: {
      serverAppId, host, port, name, contentUrl,
    },
  };
}

export function getTableauServerList() {
  console.log('getTableauServerList');
  return {
    types: [
      TABLEAU_SERVER_LIST_REQUEST,
      TABLEAU_SERVER_LIST_SUCCESS,
      TABLEAU_SERVER_LIST_FAILURE,
    ],
    callApi: () => axios.get('/api/tableau/servers'),
    payload: {},
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
    throw new Error(`Missing or invalid serverAppId: ${serverAppId}`);
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

export function tableauDataSources(serverAppId) {
  if (!serverAppId) {
    throw new Error(`Missing or invalid serverAppId: ${serverAppId}`);
  }

  return {
    types: [
      TABLEAU_SERVER_DATASOURCES_REQUEST,
      TABLEAU_SERVER_DATASOURCES_SUCCESS,
      TABLEAU_SERVER_DATASOURCES_FAILURE,
    ],
    callApi: () => axios.get('/api/tableau/datasources', {
      params: {
        serverAppId,
      },
    }),
    payload: {
      serverAppId,
    },
  };
}

export function tableauDatasourceConnections(serverAppId, datasourceId) {
  if (!serverAppId) {
    throw new Error(`Missing or invalid serverAppId: ${serverAppId}`);
  }
  if (!datasourceId) {
    throw new Error(`Missing or invalid datasourceId: ${datasourceId}`);
  }

  return {
    types: [
      TABLEAU_SERVER_CONNECTIONS_REQUEST,
      TABLEAU_SERVER_CONNECTIONS_SUCCESS,
      TABLEAU_SERVER_CONNECTIONS_FAILURE,
    ],
    shouldCallApi: (state) => !(state.tableau.datasources.find(d => d.id === datasourceId) || {}).connections,
    callApi: () => axios.get('/api/tableau/datasource/connections', {
      params: {
        serverAppId,
        datasourceId,
      },
    }),
    payload: {
      serverAppId,
      datasourceId,
    },
  };
}

export function updateTableauDatasourceConnection(serverAppId, connection, datasourceId, connectionId) {
  if (!serverAppId) {
    throw new Error(`Missing or invalid serverAppId: ${serverAppId}`);
  }
  if (!datasourceId) {
    throw new Error(`Missing or invalid datasourceId: ${datasourceId}`);
  }
  if (!connectionId) {
    throw new Error(`Missing or invalid connectionId: ${connectionId}`);
  }
  if (!connection) {
    throw new Error(`Missing or invalid connection: ${connection}`);
  }

  console.log('update... args=', arguments);

  return {
    types: [
      TABLEAU_CONNECTION_UPDATE_REQUEST,
      TABLEAU_CONNECTION_UPDATE_SUCCESS,
      TABLEAU_CONNECTION_UPDATE_FAILURE,
    ],
    callApi: () => axios.put('/api/tableau/connection', {
      serverAppId,
      datasourceId,
      connectionId,
      connection,
    }),
    payload: {
      serverAppId,
      datasourceId,
    },
  };
}

export const clearTableauServers = makeActionCreator(TABLEAU_SERVER_CLEAR_ALL);

export const setCurrentDatasource = makeActionCreator(TABLEAU_SET_CURRENT_DATASOURCE, 'datasourceId');

export const setCurrentDatasourceConnection = makeActionCreator(TABLEAU_SET_CURRENT_DATASOURCE_CONNECTION, 'connectionId');

// SELECTORS

export const getServers = state => state.tableau.servers;

export const getCurrentServer = state => state.tableau.currentServer;

export const getDataSources = state => state.tableau.datasources;

export const getCurrentDataSource = state => state.tableau.currentDatasource

export const getCurrentDatasourceConnection = state => state.tableau.currentDatasourceConnection;
