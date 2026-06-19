import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import { User } from '../models/user.js'
import { Session } from '../models/session.js'
import { createSession, setSessionCookies } from '../services/auth.js'


export const registerUser = async (req, res) => {
  const { username, email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw createHttpError(409, 'Email already in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  })

  const newSession = await createSession(newUser._id)

  setSessionCookies(res, newSession)

  res.status(201).json({ newUser })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    throw createHttpError(401, 'Invalid credentials')
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials')
  }
  
  await Session.deleteMany({ userId: user._id });
  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);

  res.status(200).json({ user: {
      id: user._id,
      username: user.username,
      email: user.email,
    } })
}

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');

  res.status(204).send();
};

export const refreshUserSession = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  if (!refreshToken || !sessionId) {
    throw createHttpError(401, 'Missing session credentials');
  }
  
  const session = await Session.findOne({ _id: sessionId, refreshToken });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = session.refreshTokenValidUntil < Date.now();
  if (isSessionTokenExpired) {
    await session.deleteOne();
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    throw createHttpError(401, 'Session token expired');
  }

  await session.deleteOne();

  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);
  
  res.status(200).json({ 'message': 'Session refreshed' });
};