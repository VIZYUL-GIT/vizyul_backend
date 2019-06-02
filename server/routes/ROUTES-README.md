# Routes Requirements

## Minimal implementation

Each route handler must do as little as necessary to extract parameters, data, etc. from the request object in order to handle the request. It should then call the appropriate API handler to do the actual work. The Express routes should be seen as glue code between the web and application code. No business logic should be implemented here!

## Parameter validation

Parameters should be validated whenever not doing so would be considered dangerous. Otherwise, the parameters should be passed as is to the API handler, where validation is mandated.

## Return values

Route handlers should set the return status and return content according to Express best practices. Since the API handlers return the full payload expected by the client, this usually means simply forwarding the response as JSON to the caller as shown below. If an error is received, the error is to be passed to the next handler for handling. This is in keeping with Express best practices, and allows for consistent handling of API errors across the entire API.

```javascript
route.get('/somecall', (req, res, next) => {
  const { ... } = req.params;
  handleApi(...)
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(err => next(err));
});
```
