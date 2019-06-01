expect.extend({
  toBeIn(received, values) {
    const pass = values.includes(received);
    if (pass) {
      return {
        message: () => `expected ${received} not to be in ${values}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} to be in ${values}`,
      pass: false,
    };
  },
})