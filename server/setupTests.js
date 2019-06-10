require('dotenv').config();

const ApiError = require('./api/ApiError');

expect.extend({
  toBeIn(received, values) {
    const pass = values.includes(received);
    if (pass) {
      return {
        message: () => `expected ${received} not to be in ${values}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} to be in ${values}`,
      pass: false,
    };
  },
  toBeApiError(received, status, message) {
    const isApiError = received.name === 'ApiError';
    const hasStatus = received.status === status;
    const hasMessage = message ? received.message === message : true;

    const pass = (isApiError && hasStatus && hasMessage);

    console.log(JSON.stringify(received), isApiError, hasStatus, hasMessage, pass);

    if (pass) {
      console.log('passing');
      return {
        message: () => `expected ${received} not to be an ApiError [${isApiError}, ${hasStatus}, ${hasMessage}]`,
        pass: true,
      };
    }
    console.log('failing');
    return {
      message: () => `expected ${received} to be an ApiError [${isApiError}, ${hasStatus}, ${hasMessage}]`,
      pass: false,
    };
  },
})