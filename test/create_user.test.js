const User = require('../src/models/user');

const { setupDB } = require('../test-setup');

// Setup a Test Database
setupDB('users_test');

describe('Creating records', () => {
  it('saves a user', async () => {
    const joe = new User({ name: 'Joe' });
    await joe.save();
    const result = await User.findOne({ name: 'Joe' });
    expect(result.name).toBe('Joe');
  });
});
