# API Handler Requirements

## API Parameter Validation

Each API handler is responsible to ensure that all parameters are valid before handling
the request. Common validation routines are available in the `validate.js` module.

```javascript
  validateUuid(uuid); // validates that the uuid is in the required form
  validatePassword(password); // enforces global password formatting requirements
  validateUsername(username); // validates that the username is valid
  validateEmail(email); // validates that the email is in correct form per RFC specifications
  validateName(name); // validates that name entry is valid
```

## API Return Values

Except where noted, each API handler is expected to provide a response in the following form when a call is successful:

```javascript
{
  status: true || false,
  ...otherkeys,
}
```

A convenience method is included in `util.js` that will supply a success status for you. This is the preferred approach since it ensures consistency in the responses.

```javascript
const success = require('./util');

return success({ key: value }); // returns { status: true, key: value }
```

## API Errors

API handlers are expected to throw a new instance of `ApiError` to indicate an error condition. The
constructor expects two parameters: a status code and a message.

```javascript
throw new ApiError(400, 'Input invalid');
```

