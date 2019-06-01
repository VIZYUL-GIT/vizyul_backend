import axios from 'axios';

import { createReducer } from '../utils';

const FILE_UPLOAD_REQUEST = 'vizyul/file/FILE_UPLOAD_REQUEST';
const FILE_UPLOAD_SUCCESS = 'vizyul/file/FILE_UPLOAD_SUCCESS';
const FILE_UPLOAD_FAILURE = 'vizyul/file/FILE_UPLOAD_FAILURE';

const initialState = {};

const reducer = createReducer(initialState, {
});

export default reducer;

export function uploadFile(files) {
  return {
    types: [
      FILE_UPLOAD_REQUEST,
      FILE_UPLOAD_SUCCESS,
      FILE_UPLOAD_FAILURE,
    ],
    // shouldCallApi: state => !(state.rep.verified && state.rep.repId === repId),
    callApi: () =>  {
      const uploaders = files.map(file => {
        const formData = new FormData();
  
        formData.append("file", file);
        formData.append("file_name", file.name);
  
        return axios.post("/api/v1/file/up", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
          .then(resp => {
            return resp;
          });
      });
      
      return axios.all(uploaders)
        .then(resp => ({ status: true, response: resp.data }))
        .catch(err => { console.log('err', err); return ({ status: false, err}); });
    },
    payload: { files },
  };
}
