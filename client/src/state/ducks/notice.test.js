import reducer, * as notice from './notice';

describe('notice state', () => {
  it('should return the correct initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should set a notice correctly', () => {
    const action = { type: 'vizyul/notice/NOTICE_SET', topic: 'elephants', message: 'Big animals' };
    const expectedResult = {'elephants': { message: 'Big animals', style: 'info' } };
    expect(reducer(null, action)).toEqual(expectedResult);
  });

  it('should replace an existing message correctly', () => {
    const initialState = { 'elephants': { message: 'Hard to slice', style: 'danger' } };
    const action = { type: 'vizyul/notice/NOTICE_SET', topic: 'elephants', message: 'Big animals' };
    const expectedResult = { 'elephants': { message: 'Big animals', style: 'info' } };
    expect(reducer(initialState, action)).toEqual(expectedResult);
  });

  it('should clear a notice correctly', () => {
    const initialState = { 'elephants': { message: 'Hard to slice', style: 'danger' } };
    const action = { type: 'vizyul/notice/NOTICE_CLEAR', topic: 'elephants' };
    const expectedResult = {};
    expect(reducer(initialState, action)).toEqual(expectedResult);
  });

  it('should clear all messages correctly', () => {
    const initialState = { 
      'elephants': { message: 'Hard to slice', style: 'danger' },
      'mouse': { message: 'Difficult to swallow', style: 'info' },
    };
    const action = { type: 'vizyul/notice/NOTICE_CLEAR_ALL' };
    const expectedResult = {};
    expect(reducer(initialState, action)).toEqual(expectedResult);
  })
});