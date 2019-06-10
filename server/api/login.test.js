import bcrypt from 'bcrypt';

import { db, errors } from '../db';

import { loginUser } from './login';

const TEST_USER_ID = '47e468ba-4c03-483b-bd34-46fb9ead1da6';
const TEST_NAME = 'vizyul-login-username';
const TEST_EMAIL = 'daffy@duck.com';
const TEST_PASSWORD = 'testpass';

const TEST_ENCRYPTED_PASSWORD ='$2b$10$TFBso.N.LwGmVDSSBHcDuuX/iJB0RUx8LvemERbvc.0dhqT08y66y'

describe('User login', () => {
  beforeEach((done) => {
    console.log('beforeEach');
    db.user.registerUser(TEST_USER_ID, TEST_NAME, TEST_EMAIL, TEST_ENCRYPTED_PASSWORD)
      .then(() => done());
  });

  afterEach((done) => {
    console.log('afterEach');
    db.none('TRUNCATE users RESTART IDENTITY')
      .then(() => done());
  });

  it('should login a user with valid credentials', (done) => {
    loginUser(TEST_EMAIL, TEST_PASSWORD)
      .then(result => {
        // Unlike other API calls, the call to loginUser should not return a { status: ... } field. The return
        // value of the loginUser is forwarded on as is. Since the client is PassportJS and not the regular API,
        // it is not required.
        expect(result).toEqual({ userId: TEST_USER_ID, name: TEST_NAME });
        done();
      })
  });

  it('should fail with invalid email address', (done) => {
    loginUser('invalid_email', TEST_PASSWORD)
      .then(result => { throw Error('Should not see this'); })
      .catch(err => {
        expect(err.message).toBe('Username or password invalid');
        expect(err.status).toBe(404);
        done();
      });
  });

  it('should fail with invalid password', (done) => {
    loginUser(TEST_EMAIL, 'invalid_password')
      .then(result => { throw Error('Should not see this'); })
      .catch(err => {
        expect(err.message).toBe('Username or password invalid');
        expect(err.status).toBe(404);
        done();
      });
  });

  it('should throw on null or undefined username or password', () => {
    const expectedMessage = 'email and password are required';
    expect(() => loginUser(null, TEST_PASSWORD)).toThrow(expectedMessage);
    expect(() => loginUser(undefined, TEST_PASSWORD)).toThrow(expectedMessage);
    expect(() => loginUser(TEST_EMAIL, null)).toThrow(expectedMessage);
    expect(() => loginUser(TEST_EMAIL, undefined)).toThrow(expectedMessage);
  });
});