import mongoose from 'mongoose';
import ApiError from '../api/ApiError';

jest.mock('./database/User', () => ({
  __esModule: true, // this property makes it work
  User: {
    create: jest.fn(() => Promise.reject(Error('Not working'))),
    findOne: jest.fn(() => Promise.resolve(null)),
  },
}));

import { User } from './database/User';
import user from './user';

mongoose.Promise = global.Promise;

const TEST_NAME = 'pardner';
const TEST_EMAIL = 'owen@wilson.com';
const TEST_PASSWORD = 'testpass';

describe('User data handling', () => {
  describe('user registration - major errors', () => {
    it('should punt major errors', () => {
      user.register(TEST_NAME, TEST_EMAIL, TEST_PASSWORD)
        .then(() => { throw Error('should not see this'); })
        .catch(err => {
          expect(err.name).toBe('ApiError');
          expect(err.status).toBe(500);
          expect(err.message).toBe('Not working');
        });
    });
  });
})