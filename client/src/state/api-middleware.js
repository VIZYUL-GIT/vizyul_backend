/**
 * Extracts pertinent information from the error returned by axios through the catch. It is important to shed
 * as much axios-specific stuff here as possible to keep the rest of the codebase from having to be too axios-aware.
 * 
 * See: https://github.com/axios/axios#handling-errors
 * @param {Axios Error object} error 
 */
const extractError = error => {
  // If this came from the concurrent utility function, the error will be trapped
  // inside as { error }. The following will unwrap the error.
  const actualError = error.error || error;

  // The server provided a response. Return the data, status and headers
  if (actualError.response) {
    const { data, status, headers } = actualError.response;
    return { data, status, headers };
  }

  // A request was made, but no response was received. Return the original request
  if (actualError.request) {
    const { request } = actualError;
    return { request };
  }

  // Something happened in setting up the request that triggered an Error
  return actualError;
};

/**
 * Since we use axios.all for concurrent API calls, we need to check the error response
 * to ensure that we correctly map the response when an array is returned (as from
 * axios.all).
 * @param {Array, object} errorResponse 
 */
const axiosErrorObject = errorResponse => {
  if (Array.isArray(errorResponse)) {
    return errorResponse.map(e => extractError(e));
  }
  return extractError(errorResponse);
};

const extractSuccess = success => {
  if (success.data) {
    return success.data
  }
  return success;
}

/**
 * Since we use axios.all for concurrent API calls, we need to check the response
 * to ensure that we correctly map the response when an array is returned.
 * @param {Array, object} successResponse 
 */
const axiosSuccessObject = successResponse => {
  if (Array.isArray(successResponse)) {
    return successResponse.map(s => extractSuccess(s));
  }
  return extractSuccess(successResponse);
};

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

    return callApi()
      .then(
        successResponse => {
          const response = axiosSuccessObject(successResponse);
          console.log('successResponse => response', successResponse, response)
          dispatch(Object.assign({}, payload, { response, type: successType }));
          return response;
        },
        errorResponse => {
          const error = axiosErrorObject(errorResponse);
          console.log('errorResponse => error', errorResponse, error);
          dispatch(Object.assign({}, payload, { error, type: failureType }));
          throw error;
        },
      );
  };
}
