const { login } = require('../controllers/users');
const { User } = require('../models/users');
const { Unauthorized } = require('http-errors');

describe('Login', () => {
  const user = {
    email: 'test@gmail.com',
    password: '123456',
    subscription: 'pro',
    _id: '5',
  };

  User.findOne = jest.fn(() => ({
    ...user,
    validPassword: pass => pass === user.password,
    setToken: () => (user.token = 'test-jwt-token'),
  }));

  User.findByIdAndUpdate = jest.fn((id, user) => ({
    select: () => ({
      email: user.email,
      subscription: user.subscription,
    }),
  }));

  const req = { body: {} };
  const res = { json: jest.fn(data => data) };
  const next = jest.fn();

  test('user can login with email and password', async () => {
    req.body = { email: 'test@gmail.com', password: '123456' };

    const {
      code,
      data: { token, user },
    } = await login(req, res, next);

    expect(code).toBe(200);
    expect(token).toBe('test-jwt-token');
    expect(user).toEqual({
      email: 'test@gmail.com',
      subscription: 'pro',
    });
    expect(typeof user).toBe('object');
    expect(typeof user.email).toBe('string');
    expect(typeof user.subscription).toBe('string');
  });

  test("user can't login with wrong email or password", async () => {
    req.body = { email: 'wrongEmail@gmail.com', password: 'wrongPass' };

    async function loginWithWrongData() {
      await login(req, res, next);
    }

    await expect(loginWithWrongData()).rejects.toThrowError(
      new Error('Email or password is wrong'),
    );
    await expect(loginWithWrongData()).rejects.toThrowError(
      /^Email or password is wrong$/,
    );
    await expect(loginWithWrongData()).rejects.toThrowError(Unauthorized);
  });
});
