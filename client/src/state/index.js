import { combineReducers } from "redux";

import files from './ducks/files';

const vizyulApp = combineReducers({
  files,
});

export default vizyulApp;
 
export * from './ducks/files';
