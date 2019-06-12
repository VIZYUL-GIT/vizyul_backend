import { createReducer, makeActionCreator } from "../utils";
import Axios from "axios";

// ACTION TYPES

const TABLEAU_SERVER_CREATE_REQUEST = 'vizyul/tableau/TABLEAU_SERVER_CREATE_REQUEST';
const TABLEAU_SERVER_CREATE_SUCCESS = 'vizyul/tableau/TABLEAU_SERVER_CREATE_SUCCESS';
const TABLEAU_SERVER_CREATE_FAILURE = 'vizyul/tableau/TABLEAU_SERVER_CREATE_FAILURE';

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
  [TABLEAU_SERVER_CLEAR_ALL]: () => initialState,
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
    callApi: () => Axios.post('/api/tableau/server', {
      host, port, name, password, contentUrl,
    }),
    payload: {
      host, port, name, contentUrl,
    },
  };
}

export const clearTableauServers = makeActionCreator(TABLEAU_SERVER_CLEAR_ALL); 

// SELECTORS

export const getServers = (state) => state.tableau.servers;
