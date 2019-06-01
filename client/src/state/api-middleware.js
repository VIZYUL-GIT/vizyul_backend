export default function callApiMiddleware({ dispatch, getState }) {
  return next => action => {
    const { types, callApi, shouldCallApi = () => true, payload = {} } = action;

    if (!types) {
      return next(action);
    }

    if (
      !Array.isArray(types)
      || types.length !== 3
      || !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types');
    }

    if (typeof callApi !== 'function') {
      throw new Error('Expected callApi to be a function');
    }

    if (!shouldCallApi(getState())) {
      return Promise.resolve();
    }

    const [requestType, successType, failureType] = types;

    dispatch(Object.assign({}, payload, { type: requestType }));

    return callApi().then(
      response => {
        if (!response.status) {
          dispatch(Object.assign({}, payload, { type: failureType, error: response.message || 'An error occurred, check server logs' }));
        } else {
          dispatch(Object.assign({}, payload, { type: successType, response: response.data }));
        }
        return Promise.resolve({ response: response.response });
      },
      error => {
        dispatch(Object.assign({}, payload, { type: failureType, error: error.message }));
        return Promise.reject(error);
      }
    );
  };
}
