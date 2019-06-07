import axios from 'axios';
import uuid from 'uuid/v4';

import { createReducer } from '../utils';
import { concurrent } from '../axios-utils';

const FILE_UPLOAD_REQUEST = 'vizyul/file/FILE_UPLOAD_REQUEST';
const FILE_UPLOAD_SUCCESS = 'vizyul/file/FILE_UPLOAD_SUCCESS';
const FILE_UPLOAD_FAILURE = 'vizyul/file/FILE_UPLOAD_FAILURE';

const initialState = {};

const reducer = createReducer(initialState, {
});

export default reducer;

export function uploadFiles(files) {
  return {
    types: [
      FILE_UPLOAD_REQUEST,
      FILE_UPLOAD_SUCCESS,
      FILE_UPLOAD_FAILURE,
    ],
    // shouldCallApi: state => !(state.rep.verified && state.rep.repId === repId),
    callApi: () =>  {
      const sessionId = uuid();

      const uploaders = files.map(file => {
        const formData = new FormData();
  
        formData.set('sessionId', sessionId);
        formData.append("file", file);
        formData.append("file_name", file.name);
  
        return axios.post("/api/file/up", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
          .then(resp => {
            console.log('callApi response (file upload)', resp);
            return resp;
          });
      });
      return concurrent(uploaders);
    },
    payload: { files },
  };
}
