import { combineReducers } from "redux";

import files from './ducks/files';
import user from './ducks/user';

const vizyulApp = combineReducers({
  files,
  user,
});

export default vizyulApp;
 
export * from './ducks/files';
export * from './ducks/user';