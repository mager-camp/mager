import bcrypt from 'bcrypt';

import {
  getProfileRepo,
  updateProfileRepo,
  getUserPasswordRepo,
  updatePasswordRepo,
  deleteAccountRepo
} from './profile.repository.js';

export const getProfile = async (
  userId
) => {
  return getProfileRepo(userId);
};

export const updateProfile =
  async (userId, payload) => {
    return updateProfileRepo(
      userId,
      payload
    );
  };

export const changePassword =
  async (
    userId,
    currentPassword,
    newPassword
  ) => {
    const user =
      await getUserPasswordRepo(
        userId
      );

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.passwordHash
      );

    if (!isMatch) {
      throw new Error(
        'Current password incorrect'
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    return updatePasswordRepo(
      userId,
      hashedPassword
    );
  };

export const deleteAccount =
  async (userId) => {
    return deleteAccountRepo(userId);
  };