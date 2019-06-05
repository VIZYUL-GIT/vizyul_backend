import mongoose from 'mongoose';

import { User } from './database/User';
import user from './user';

mongoose.Promise = global.Promise;

const MONGODB_URI = 'mongodb://localhost/test';
const options = {
  keepAlive: 300000,
  socketTimeoutMS: 30000,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const TEST_ID = '47e468ba-4c03-483b-bd34-46fb9ead1da6';
const TEST_NAME = 'pardner';
const TEST_EMAIL = 'owen@wilson.com';
const TEST_PASSWORD = 'testpass';
const TEST_ENCRYPTED_PASSWORD ='$2b$10$TFBso.N.LwGmVDSSBHcDuuX/iJB0RUx8LvemERbvc.0dhqT08y66y'

describe('User data handling', () => {
  beforeAll((done) => {
    mongoose.connect(MONGODB_URI, options);
    mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
    // mongoose.set('debug', true);
    done();
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });

  describe('user registration', () => {
    beforeEach((done) => {
      User.deleteMany({ email: TEST_EMAIL })
        .then(() => done());
    });

    it('should create a user with valid credentials', () => {
      return user.register(TEST_NAME, TEST_EMAIL, TEST_PASSWORD)
        .then(result => {
          expect(result.status).toBe(true);
          expect(result.userId).toBeTruthy();
        });
    });

    it('should fail when a duplicate email address is used', () => {
      return User.create({ userId: TEST_ID, name: TEST_NAME, email: TEST_EMAIL, password: TEST_ENCRYPTED_PASSWORD })
        .then(result => {
          return user.register('another name', TEST_EMAIL, TEST_PASSWORD)
            .then(() => { throw Error('Should not see this'); })
            .catch((err) => {
              expect(err.status).toBe(400);
              expect(err.message).toBe(`Email address (${TEST_EMAIL}) already exists`)
            })
        });
    });

    it('should fail when the parameters are null or undefined', () => {
      expect(() => user.register(null, TEST_EMAIL, TEST_PASSWORD)).toThrow('Invalid name');
      expect(() => user.register(TEST_NAME, null, TEST_PASSWORD)).toThrow('Invalid email');
      expect(() => user.register(TEST_NAME, TEST_EMAIL, null)).toThrow('Invalid password');
    });
  });
})