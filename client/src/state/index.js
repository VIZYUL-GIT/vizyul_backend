import { combineReducers } from "redux";

import user from './ducks/user';
import notice from './ducks/notice';
import session from './ducks/session';

const vizyulApp = combineReducers({
  user,
  notice,
  session,
});

export default vizyulApp;
 
export * from './ducks/user';
export * from './ducks/notice';
export * from './ducks/session';