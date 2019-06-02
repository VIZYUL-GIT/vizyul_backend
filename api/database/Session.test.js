import { Document } from 'mongoose';
import { Session } from './Session';

describe('User schema and model', () => {
  it('should supply a default "Session_..." name', () => {
    const session = new Session();
    expect(session instanceof Document).toBeTruthy();
    expect(session.name).toMatch(/^Session_/);
  });
});
