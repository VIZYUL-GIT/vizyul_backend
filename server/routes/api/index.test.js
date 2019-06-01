import axios from 'axios';

describe('API base', () => {
  it('should respond to a healthcheck API call correctly', 
    () => axios.get('http://localhost:5000/api/health')
      .then((resp) => {
        expect(resp.status).toBe(200);
        expect(resp.data.status).toBe(true);
        expect(resp.data.message).toBe('OK');
      })
  );
});