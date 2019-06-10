/**
 * Format the message for a DismissableAlert from an error returned from the API middleware.
 */
const formatSingleError = (err) => {
  if (err.data) {
    return `${err.status} - ${err.data.message}`;
  }
  if (err.request) {
    return `Unable to make request: ${err.message}`;
  }
  return `An error occurred: ${err.message}`;
};

export default function formatErrorMessage(err) {
  if (Array.isArray(err)) {
    return err.map(e => formatSingleError(e)).join(', ');
  }
  return formatSingleError(err);
};
