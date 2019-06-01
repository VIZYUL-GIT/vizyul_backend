import { combineReducers } from "redux";

import files from './ducks/files';
import user from './ducks/user';
import notice from './ducks/notice';

const vizyulApp = combineReducers({
  files,
  user,
  notice,
});

export default vizyulApp;
 
export * from './ducks/files';
export * from './ducks/user';
export * from './ducks/notice';
