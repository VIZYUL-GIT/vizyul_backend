import _ from 'underscore';

import { createReducer, makeActionCreator } from '../utils';

// ACTION TYPES

const NOTICE_SET = 'vizyul/notice/NOTICE_SET';
const NOTICE_CLEAR = 'vizyul/notice/NOTICE_CLEAR';
const NOTICE_CLEAR_ALL = 'vizyul/notice/NOTICE_CLEAR_ALL';

// REDUCER

const initialState = {};

const reducer = createReducer(initialState, {
  [NOTICE_SET]: (state, action) => ({
    ...state,
    [action.topic]: { message: action.message, style: action.style || 'info' },
  }),
  [NOTICE_CLEAR]: (state, action) => _.omit(state, action.topic),
  [NOTICE_CLEAR_ALL]: () => initialState,
});

export default reducer;

// ACTIONS

export const setNotice = makeActionCreator(NOTICE_SET, 'topic', 'message', 'style');

export const clearNotice = makeActionCreator(NOTICE_CLEAR, 'topic');

// SELECTORS

export const getNotice = (state, topic) => state.notice[topic];
