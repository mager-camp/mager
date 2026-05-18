import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount
} from './profile.service.js';

import {
  updateProfileSchema,
  changePasswordSchema
} from './profile.validation.js';

export const getMe = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await getProfile(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (
  req,
  res,
  next
) => {
  try {
    const payload =
      updateProfileSchema.parse(
        req.body
      );

    const data =
      await updateProfile(
        req.user.id,
        payload
      );

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword =
  async (req, res, next) => {
    try {
      const payload =
        changePasswordSchema.parse(
          req.body
        );

      await changePassword(
        req.user.id,
        payload.currentPassword,
        payload.newPassword
      );

      res.status(200).json({
        success: true,
        message:
          'Password updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

export const removeAccount =
  async (req, res, next) => {
    try {
      await deleteAccount(
        req.user.id
      );

      res.status(200).json({
        success: true,
        message:
          'Account deleted successfully'
      });

      // alternatif lebih RESTful:
      // res.status(204).send();
    } catch (error) {
      next(error);
    }
  };