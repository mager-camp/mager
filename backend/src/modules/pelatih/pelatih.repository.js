import prisma from "../../config/prisma.js";
import { ROLES } from "../../constants/roles.js";

export const countAtlet = async () => {
  return prisma.user.count({
    where: {
      role: {
        name: ROLES.USER,
      },
    },
  });
};

export const countKursus = async (userId) => {
  return prisma.course.count({
    where: {
      createdBy: userId,
    },
  });
};

export const countJadwal = async () => {
  return prisma.userSchedule.count();
};

export const findAtlet = async () => {
  return prisma.user.findMany({
    where: {
      role: {
        name: ROLES.USER,
      },
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      profilePicture: true,
      createdAt: true,
      isPremium: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findKursus = async (userId) => {
  return prisma.course.findMany({
    where: {
      createdBy: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      about: true,
      totalDurasi: true,
      type: true,
      thumbnailUrl: true,
      createdAt: true,
      _count: {
        select: {
          modules: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findJadwal = async () => {
  return prisma.userSchedule.findMany({
    include: {
      user: true,
      activity: true,
    },
    take: 10,
    orderBy: {
      scheduledAt: "desc",
    },
  });
};