import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { loginUser } from './login';
import { User } from './database/User';

mongoose.Promise = global.Promise;

const TEST_USER_ID = '47e468ba-4c03-483b-bd34-46fb9ead1da6';
const TEST_NAME = 'vizyul-login-username';
const TEST_EMAIL = 'daffy@duck.com';
const TEST_PASSWORD = 'testpass';

const TEST_ENCRYPTED_PASSWORD ='$2b$10$TFBso.N.LwGmVDSSBHcDuuX/iJB0RUx8LvemERbvc.0dhqT08y66y'

const MONGODB_URI = 'mongodb://localhost/test';
const options = {
  keepAlive: 300000,
  socketTimeoutMS: 30000,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

describe('User login', () => {
  beforeAll((done) => {
    mongoose.connect(MONGODB_URI, options);
    mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
    // mongoose.set('debug', true);
    done();
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });

  beforeEach(() => User.create({ userId: TEST_USER_ID, name: TEST_NAME, email: TEST_EMAIL, password: TEST_ENCRYPTED_PASSWORD })
      // .then(() => done());
      .then((resp) => {
        return User.findOne({ email: TEST_EMAIL })
          .then(found => {
            expect(found.password).toBe(TEST_ENCRYPTED_PASSWORD);
          });
      })
  );

  afterEach((done) => {
    User.deleteMany({ email: TEST_EMAIL })
      .then((resp) => done());
  });

  it('should login a user with valid credentials', () => {
    return loginUser(TEST_EMAIL, TEST_PASSWORD)
      .then(result => {
        // Unlike other API calls, the call to loginUser should not return a { status: ... } field. The return
        // value of the loginUser is forwarded on as is. Since the client is PassportJS and not the regular API,
        // it is not required.
        expect(result).toEqual({ userId: TEST_USER_ID, name: TEST_NAME });
      })
  });

  it('should fail with invalid email address', () => {
    return loginUser('invalid_email', TEST_PASSWORD)
      .then(result => { throw Error('Should not see this'); })
      .catch(err => {
        expect(err.message).toBe('Username or password invalid');
        expect(err.status).toBe(404);
      });
  });

  it('should fail with invalid password', () => {
    return loginUser(TEST_EMAIL, 'invalid_password')
      .then(result => { throw Error('Should not see this'); })
      .catch(err => {
        expect(err.message).toBe('Username or password invalid');
        expect(err.status).toBe(404);
      });
  });

  it('should throw on null or undefined username or password', () => {
    const expectedMessage = 'email and password are required';
    expect(() => loginUser(null, TEST_PASSWORD)).toThrow(expectedMessage);
    expect(() => loginUser(undefined, TEST_PASSWORD)).toThrow(expectedMessage);
    expect(() => loginUser(TEST_EMAIL, null)).toThrow(expectedMessage);
    expect(() => loginUser(TEST_EMAIL, undefined)).toThrow(expectedMessage);
  })
});