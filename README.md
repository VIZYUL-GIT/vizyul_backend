# VIZYUL EXPRESS APPLICATION

## Table of Contents

- [VIZYUL EXPRESS APPLICATION](#vizyul-express-application)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)
    - [Running Tests](#running-tests)
  - [Application Structure](#application-structure)
    - [Express](#express)
    - [React](#react)
  - [Express Routes](#express-routes)
    - [Default Route](#default-route)
    - [API routes](#api-routes)
    - [Route Example](#route-example)
  - [Authentication](#authentication)
  - [Authorization](#authorization)
    - [API Endpoint Authorization](#api-endpoint-authorization)
  - [Express Error Handling](#express-error-handling)

## Overview

The client platform for the VIZYUL Web Application is implemented using the following technologies:

- <strong>Client Side</strong>
  - <strong>React&mdash;</strong>Specifically [Create-React-App (CRA)](https://github.com/facebook/create-react-app) which provides a controlled environment for creating React-based applications.
  - <strong>Redux&mdash;</strong>For state management and event processing. See [the Redux website](https://redux.js.org/) for more information.
  - <strong>Axios&mdash;</strong>Promise-based HTTP client for the browser and node.js. Used to access the Express-hosted API end points.
- <strong>Server Side</strong>
  - <strong>Express&mdash;</strong>[Express](https://expressjs.com/) is a Node.js-based web server implementation.
  - <strong>MongoDB&mdash;</strong>One of the leading document-based database management systems is [MongoDB](https://www.mongodb.com/).
  - <strong>Mongoose&mdash;</strong>[Mongoose](https://mongoosejs.com/) provides a straight-forward, schema-based solution to model application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

## Installation

> The following information reflects the refactoring in progress, and will be updated when the refactoring is complete and merged into the master branch.

> If, while following these instructions, you see a message regarding packages or executables not found, please contact the developer so that the necessary instructions can be added.


### Prerequisites

In order to install and run the web application, you need to have the following installed on your local system:

- <strong>nvm</strong> 0.34.0 or higher.
- <strong>Node</strong> 8.9.1 or higher.
- <strong>npm</strong> 4.6.1 or higher.
- <strong>yarn</strong> 1.5.1 or higher.
- <strong>PostgreSQL</strong> 11.

It is recommended that you install `nvm` first, and then install `node` using `nvm`. Instructions for `node` are located [here](https://nodejs.org/en/download/).

Development tools:
- <strong>jest</strong> latest, global install.
- <strong>create-react-app</strong> latest.
- <strong>db-migrate</strong> latest.
- <strong>db-migrate-pg</strong> latest.


Install these tools using the following command:
  ```
  npm install -g create-react-app jest db-migrate db-migrate-pg
  ```
### Installation Steps

1. Open a terminal window.
2. Clone the GitHub repository on your local machine. Enter your username and password when prompted.
   ```
   git clone https://github.com/...
   ```
3. Enter the cloned repository.
   ```
   cd vizyul_backend
   ```
4. Switch to the `passport` branch.
   ```
   git checkout passport
   ```
5. Install the Node packages.
   ```
   npm install
   ```
6. Create the `.env` file in the project root folder. It should contain the following _edited_ entries:
   ```
   WEB_CONCURRENCY=2
   SESSION_SECRET=[add session secret]
   LINKEDIN_CONSUMER_KEY=[add key]
   LINKEDIN_CONSUMER_SECRET=[add secret]
   LINKEDIN_CALLBACK_URL=[add callback url]
   ```
7. Fire up Express to verify installation.<br/>
   Linux:
   ```
   DEBUG=vizyul:* nodemon
   ```
   If all goes well, you should see output similar to the following:
   ```
   [nodemon] 1.19.1
   [nodemon] reading config ./nodemon.json
   [nodemon] to restart at any time, enter `rs`
   [nodemon] or send SIGHUP to 39495 to restart
   [nodemon] ignoring: files/**/* client/**/*
   [nodemon] watching: *.*
   [nodemon] watching extensions: js,mjs,json
   [nodemon] starting `node bin/www`
   [nodemon] forking
   [nodemon] child pid: 39515
   [nodemon] watching 109 files
   Master process is running
     vizyul:db Mongoose connection established +0ms
   Mongoose: users.createIndex({ email: 1 }, { unique:    true, background: true })
   Worker 2 is online and ready.
   Worker 1 is online and ready.
     vizyul:server Listening on port 5000 +0ms
     vizyul:db Mongoose connection established +0ms
   Mongoose: users.createIndex({ email: 1 }, { unique:    true, background: true })
     vizyul:server Listening on port 5000 +0ms
     vizyul:db Mongoose connection established +0ms
   Mongoose: users.createIndex({ email: 1 }, { unique: true, background: true })
   ```
8. Open a _second_ terminal window.
9. Change to the `client` directory which houses the React application itself.
   ```
   cd client
   ```
10. Install the client Node packages.
    ```
    npm install
    ```

11. Run the client application.
    ```
    npm start
    ```
    If all goes well, after a little while, you will see the default browser load a new tab to house the running application, and the terminal will display the following message:
    ```
    Compiled successfully!
    
    You can now view client in the browser.
    
      Local:            http://localhost:8080/
      On Your Network:  http://192.168.245.208:8080/
    
    Note that the development build is not optimized.
    To create a production build, use npm run build.
    ```
    The browser will display the index page of the application.   

### Running Tests

**Note: The Express-hosted API must be running when tests are running. See step 7 above.**

1. In a separate terminal window, navigate to the project root folder.
   ```
   cd <project root>
   ```
2. Run the Express API tests.
   ```
   npm run test:watch
   ```
   The tests will begin to run after a long pause. They will be executed any time a monitored file changes.
3. In a new terminal window, navigate to the `client` directory to run the React tests.
   ```
   cd <project root>/client
   ```
4. Run the React tests.
   ```
   npm test
   ```

## Application Structure

The application is organized as a Node Express application with an embedded React application that is served to handle the user interaction in place of the usual Express template engines.

### Express

The key directories and files related to Express are as follows:

```
├── api
│   └── database
├── bin
│   └── www
├── db
├── graphql
├── routes
├── server
│   └── config
│   └── routes
│   └── index.js
├── .babelrc
├── .env
├── .gitignore
└── package.json
```
Here is a summary of each directory. Additional detail will be provided in the appropriate section of the Readme.
- <strong>/api</strong> Contains the execution logic of the server-side API.
- <strong>/api/database</strong> The database interface routines responsible for MongoDB/Mongoose integration.
- <strong>/bin/www</strong> The Express startup script.
- <strong>/server</strong> The Express application itself.
- <strong>/server/routes</strong> The Express routes that serve the server-side API.
- <strong>/server/index.js</strong> The Express app itself.
- <strong>.babelrc</strong> Required for running jest tests.
- <strong>.env</strong> Holds development environment variables required for Express.
- <strong>.gitignore</strong> Details directories and files not stored in the Git repository.
- <strong>package.json</strong> The Node.js configuration file for the Express application.
- <strong>setupTests.js</strong> Jest extension implementing additional matchers.

### React

React is implemented as an embedded application within Express and it is housed in the `client` directory. When a user comes to the site, Express serves the React application which is then responsible for its own routing and rendering within the browser.

The key directories and files related to React are as follows:

```
├── client
│   └── build
│   └── coverage
│   └── node_modules
│   └── public
│   ├── src
|   |   └── actions
|   |   └── components
|   |   └── images
|   |   └── pages
|   |   └── state
|   |   └── styles
|   |   └── utils
|   |   └── App.js
|   |   └── AppRouter.js
|   |   └── constants.js
|   |   └── index.js
│   └── .babelrc
│   └── .env
│   └── .gitignore
│   └── package.json
```
Here is a summary of these directories and files. Additional detail will be provided in subsequent sections of the Readme. These descriptions are all relative to the `client` directory.
- <strong>/build</strong> This directory contains the compiled version of the React application.
- <strong>/coverage</strong> This directory contains detailed test coverage reports generated by jest when coverage analysis is requested.
- <strong>/public</strong> This directory contains static elements and *should be used sparingly.* More often than not, there are other places where static content (CSS, images, etc.) is better placed.
- <strong>/src</strong> The directory that holds all the React application source code.
  - <strong>/src/components</strong> Custom React components. Typically smaller modules that are composed into full pages. May also include component specific assets such as CSS, images, etc.
  - <strong>/src/pages</strong> Holds all the site pages. These are components that render the application routes.
  - <strong>/src/state</strong> The Redux store definition and application state management routines. These include reducers, actions and selectors.
  - <strong>/src/styles</strong> The site-wide CSS rules. Component-specific styles are housed in the same directory as the component definitions.
  - <strong>/src/App.js</strong> The core React application component.
  - <strong>/src/AppRouter.js</strong> The routes provided by the React application, along with the components responsible for rendering each route.
  - <strong>/src/history.js</strong> Browser history object singleton that allows programmatic page changes.
  - <strong>/src/index.js</strong> The main entry point for the React application.
- <strong>.babelrc</strong> Configuration file for babel that disambiguates from the same file in the Express application.
- <strong>.gitignore</strong> The React application has its own .gitignore that deals with the React-specific exclusions. Git combines both the Express and the React application files to determine which project directories and files to exclude. *Important: This file uses paths relative to the `/client` directory, not the project root.*

## Express Routes

Routes are organized according to content area, forming services that are exposed via HTTP and a specific URL.

### Default Route

The default route simply serves the React application entry page. It is a simple routine that is defined as follows:

```javascript
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'client/build/index.html'));
});
```

### API routes

Each route utilizes services provided in three separate architectural layers to accomplish its task. These areas are:
- <strong>The Express Router</strong> This is a thin layer, simply deferring to the API Execution layer for execution, and returning the results to the caller. These routes are housed in the `/routes` directory. This layer is dependent solely on the business logic layer. The error handling in this layer is centralized to prevent duplicated logic throughout the application.
- <strong>The API Execution Layer</strong> This layer handles the actual processing of requests made, formatting and returning results. Errors here are returned via the `ApiError` object. All relevant database errors (unique contraints, null constraints, etc.) are interpreted and handled in this layer. These routines are situated in the `/api` directory. This layer is solely dependent on the database access layer.
- <strong>The Database Access Layer</strong> This is another thin layer deals with database access concerns such as pooling, query execution and MongoDB query code. The database initialization code, schemas and models are housed in the `/api/database` directory.

### Route Example

By way of example, consider the following route implemented in the `user` directory. Given the asynchronous nature of these calls, they are implemented as Promises.

```javascript
// file: /server/routes/api/user.js

router.post('/register', (req, res, next) => {
  const { name, email, password } = req.body;
  user.register(name, email, password)
  .then(
    result => {
      debug('/register returning', result);
      res.status(201).json(result);
    },
    err => next(err),
  );
});
```

Given that this route is found in the `user.js` file, it defines a route whose full signature is `/api/user/register`. When a matching request is received, the request body is processed and the API handler in the <strong>API Execution Layer</strong> is called. When the API handler completes successfully, the result is returned to the client with a status of 201 (Created). If the call fails, the error is forwarded to the central error handler.

The example given is for an unprotected API endpoint. This call can be made by a user that has not logged in.

The API handler is defined as follows:

```javascript
const register = (name, email, pword) => {
  validateName(name);
  validateEmail(email);
  validatePassword(pword);
  return User.findOne({ email })
    .then(user => {
      if (user === null) {
        const userId = uuid();
        const salt = bcrypt.genSaltSync(10);

        return User.create({ userId, name, email, password: bcrypt.hashSync(pword, salt) })
        .then(
          () => success({ userId }),
          (err) => { if (err) throw new ApiError(500, err.message); }, // escape hatch during development 
        ); 
      }
      throw new ApiError(400, `Email address (${email}) already exists`);
    });
};
```


The `authenticate` middleware is described below (see [Access Authorization](#access-authorization)).

The API handler is responsible for validating the parameters passed in. If the parameters are valid, they are passed to the database handler for processing. Validation errors result in an `ApiError` being thrown.

If the database call completes successfully, the result is formatted and passed back to the client. API handlers will always set a boolean `status` flag to indicate success or failure.

If no matching user is found, or if the password doesn't match the stored hash, the call is rejected with an `ApiError`. Other failures are simply forwarded.

The database query is handled via the `User` model defined in the database layer. The model is provided via Mongoose.

## Authentication

Authentication is handled via `passport`. The current inplementation utilizes the Local Strategy to authenticate users as described below.

```javascript
// file: /server/config/local.js

module.exports = new LocalStrategy((email, password, done) => {
  loginUser(email, password)
  .then((user) => done(null, user))
  .catch((err) => done(err));
});
```

The `loginUser` API handler is used to validate the credentials of a user when they attempt to login.

```javascript
// file: /server/config/passport.js

module.exports = (passport) => {
  passport.serializeUser((userInfo, done) => {
    debug('serializeUser', userInfo);
    done(null, userInfo);
  });

  passport.deserializeUser((userInfo, done) => {
    debug('deserializeUser', userInfo);
    const { userId } = userInfo;
    
    User.findOne({ userId })
      .then(
        () => done(null, userInfo),
        () => done(null, false, { message: 'Invalid user information' }),
      );
  });

  passport.use('local', local);
};
```

Passport uses the routine above after the user information is extracted from the session cookie. If the userId matches a user in the database, the user is considered authenticated.

## Authorization

Authorization is determined at two points in the application stack. The first check is when a call is made to a protected API endpoint. The second 

### API Endpoint Authorization

User authorization is verified using a small piece of Express middleware that ensures that only users with valid sessions can make requests. This middleware is defined as follows:

```javascript
// file: /routes/auth-check.js

const authenticate = (req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ status: false, message: 'Not logged in'});
    }
  } else {
    next();
  }
};
```

Before the request is processed, this middleware routine calls `req.isAuthenticated` (provided by `passport`). If the user is authenticated, the request is forwarded for processing. Otherwise a 401 (unauthorized) status is returned with a message of `Not logged in`.

> The authorization check is only conducted when in the production environment in order to facilitate local testing.

## Express Error Handling

More to come...