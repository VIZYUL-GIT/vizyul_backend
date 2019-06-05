import axios from 'axios';

/**
 * Wraps a call to axios.all to avoid the fail-fast behavior of Promise.all, which fails when the first call fails.
 * Instead, responses are mapped so that they resolve instead of reject. All the responses are then evaluated to
 * determine if any one of them failed. If so, the responses are thrown. Otherwise, the supplied then is called to
 * process the responses.
 */
export const concurrent = (axiosCalls) => {
  const promisesResolved = axiosCalls.map(promise => promise.catch(error => ({ error })));

  const checkFailed = then => responses => {
    const someFailed = responses.some(response => response.error);
    if (someFailed) {
      throw responses;
    }
    return then(responses);
  };

  return axios.all(promisesResolved)
    .then(checkFailed(response => response));
}
