import { Document } from 'mongoose';
import { User } from './User';

describe('User schema and model', () => {
  it('should require userId, username, and password', () => {
    const user = new User();
    expect(user instanceof Document).toBeTruthy();
    user.validate((err) => {
      expect(err.errors['userId']).toBeTruthy();
      expect(err.errors['name']).toBeTruthy();
      expect(err.errors['email']).toBeTruthy();
    });
  });
});