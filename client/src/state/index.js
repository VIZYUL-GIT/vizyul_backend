import { combineReducers } from "redux";

import user from './ducks/user';
import notice from './ducks/notice';
import session from './ducks/session';
import tableau from './ducks/tableau';

const vizyulApp = combineReducers({
  notice,
  session,
  tableau,
  user,
}); 

export default vizyulApp; 
 
export * from './ducks/user';
export * from './ducks/notice';
export * from './ducks/session';
export * from './ducks/tableau';
