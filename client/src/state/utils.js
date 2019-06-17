// Source: see https://redux.js.org/recipes/reducing-boilerplate

export const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues);

// This function has been adapted in the following ways:
// 1. It utilizes a match function that permits the caller to specify how items are matched
// 2. It utilizes an update function to perform the actual update. When the update function is passed 'undefined',
//    it signals the creation of a new item in the array.
// The original array is left unchanged.
export const updateItemInArray = (array, match, update) => {
  if (typeof match !== 'function') {
    throw Error('match must be a function');
  }
  if (typeof update !== 'function') {
    throw Error('update must be a function');
  }

  if (array.find(item => match(item))) {
    return array
      .map((item) => {
        if (!match(item)) {
          return item;
        }
        const result = update(item);
        return result;
      });
  }
  const u = update(undefined); // Signal the construction of a brand new item...
  if (u) {
    return array.concat(u);
  }
  return array;
};

export const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    console.log('reducer -> ', action);
    return handlers[action.type](state, action);
  }
  return state;
};

export function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}
