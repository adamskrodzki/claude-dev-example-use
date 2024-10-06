import { signUp, login, logout } from '../services/apiService';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'success' }),
  })
);

describe('API Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should call signUp API with correct parameters', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    await signUp(email, password);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/signup', expect.any(Object));
  });

  it('should call login API with correct parameters', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    await login(email, password);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/login', expect.any(Object));
  });

  it('should call logout API', async () => {
    await logout();
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/logout', expect.any(Object));
  });
});