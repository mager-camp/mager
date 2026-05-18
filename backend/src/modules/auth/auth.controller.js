import {
  registerUser,
  loginUser,
  getCurrentUser
} from './auth.service.js';

import {
  registerSchema,
  loginSchema
} from './auth.validation.js';

export const register = async (
  req,
  res,
  next
) => {
  try {
    const payload = registerSchema.parse(req.body);

    const user = await registerUser(payload);

    res.status(201).json({
      success: true,
      message: 'Register success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req,
  res,
  next
) => {
  try {
    const payload = loginSchema.parse(req.body);

    const result = await loginUser(payload);

    res.status(200).json({
      success: true,
      message: 'Login success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};