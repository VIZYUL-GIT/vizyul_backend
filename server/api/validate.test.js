const v = require('./validate');

const VALID_TEST_UUID = '47e468ba-4c03-483b-bd34-46fb9ead1da6';
const VALID_TEST_PASSWORD = 'thisisvalid';
const VALID_TEST_USERNAME = 'stevemartin';
const VALID_TEST_EMAIL = 'steve@martin.com';
const VALID_TEST_NAME = 'Steve Martin';

const INVALID_TEST_UUID = '47e468ba-4c03-483b-cd34-46fb9ead1da6';
const INVALID_TEST_PASSWORD = '';
const INVALID_TEST_USERNAME = 'steve martin';
const INVALID_TEST_EMAIL = 'steve@martin';
const INVALID_TEST_NAME = 'Steve_Martin';

describe('API Parameter Validations', () => {
  describe('UUID', () => {
    it('should accept valid UUIDs', () => {
      expect(() => v.validateUuid(VALID_TEST_UUID)).not.toThrow();
    })
  
    it('should reject invalid UUIDs', () => {
      expect(() => v.validateUuid(INVALID_TEST_UUID)).toThrow();
    });
  });

  describe('Password', () => {
    it('should accept valid passwords', () => {
      expect(() => v.validatePassword(VALID_TEST_PASSWORD)).not.toThrow();
    })
  
    it('should reject invalid UUIDs', () => {
      expect(() => v.validatePassword(INVALID_TEST_PASSWORD)).toThrow();
    });
  });

  describe('Username', () => {
    it('should accept valid usernames', () => {
      expect(() => v.validateUsername(VALID_TEST_USERNAME)).not.toThrow();
    })
  
    it('should reject invalid usernames', () => {
      expect(() => v.validateUsername(INVALID_TEST_USERNAME)).toThrow();
    });
  });

  describe('Email', () => {
    it('should accept valid emails', () => {
      expect(() => v.validateEmail(VALID_TEST_EMAIL)).not.toThrow();
    })
  
    it('should reject invalid emails', () => {
      expect(() => v.validateEmail(INVALID_TEST_EMAIL)).toThrow();
    });
  });

  describe('Name', () => {
    it('should accept valid names', () => {
      expect(() => v.validateName(VALID_TEST_NAME)).not.toThrow();
    })
  
    it('should reject invalid names', () => {
      expect(() => v.validateName(INVALID_TEST_NAME)).toThrow();
    });
  });
});