import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signToken } from '../../utils/jwt.js';
import { ROLES } from '../../constants/roles.js';
import {
  findUserByEmail,
  createUser,
  findUserById
} from './auth.repository.js';
import {
  hashPassword,
  comparePassword
} from '../../utils/hash.js';
export const registerUser = async (payload) => {
  const existingUser = await findUserByEmail(payload.email);

  if (existingUser) {
    throw new Error('Email already used');
  }

  const hashed = await hashPassword(payload.password);

  const user = await createUser({
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    passwordHash: hashed,
    role: {
      connect: { name: ROLES.USER }
    }
  });

  return user;
};
export const loginUser = async (payload) => {
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await comparePassword(
    payload.password,
    user.passwordHash
  );

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role.name
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role.name
    },
    token
  };
};

export const getCurrentUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};