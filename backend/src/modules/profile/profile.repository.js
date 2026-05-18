import prisma from '../../config/prisma.js';

export const getProfileRepo = (
  userId
) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      profilePicture: true,
      isPremium: true,
      createdAt: true
    }
  });
};

export const updateProfileRepo = (
  userId,
  data
) => {
  return prisma.user.update({
    where: { id: userId },
    data
  });
};

export const getUserPasswordRepo = (
  userId
) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      passwordHash: true
    }
  });
};

export const updatePasswordRepo = (
  userId,
  passwordHash
) => {
  return prisma.user.update({
    where: { id: userId },
    data: { passwordHash }
  });
};

export const deleteAccountRepo = (
  userId
) => {
  return prisma.user.delete({
    where: { id: userId }
  });
};