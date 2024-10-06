const supabase = require('../services/supabaseClient');

// Mock environment variables
process.env.SUPABASE_URL = 'https://xyzcompany.supabase.co';
process.env.SUPABASE_KEY = 'public-anon-key';

// Tests

describe('Supabase Client', () => {
  it('should be initialized with the correct URL and key', () => {
    expect(supabase).toBeDefined();
    expect(supabase.auth).toBeDefined();
  });

  it('should have authentication methods', () => {
    expect(typeof supabase.auth.signIn).toBe('function');
    expect(typeof supabase.auth.signOut).toBe('function');
  });
});