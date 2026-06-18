import prisma from '../../config/prisma.js';

export const getTodayNotificationsRepo = async (userId) => {
  const today    = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return prisma.userSchedule.findMany({
    where: {
      userId,
      alarmEnabled: true,
      startAt: {          
        gte: today,
        lt:  tomorrow,
      },
    },
    include: { activity: true },
    orderBy: { startAt: 'asc' },
  });
};
export const getUnreadNotificationsRepo = async (userId) => {
  return prisma.notification.findMany({
    where:   { userId, isRead: false },
    include: { schedule: { include: { activity: true } } },
    orderBy: { createdAt: 'desc' },
    take:    20,
  });
};

export const markAllReadRepo = async (userId) => {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data:  { isRead: true },
  });
};

export const markOneReadRepo = async (id, userId) => {
  return prisma.notification.update({
    where: { id, userId },
    data:  { isRead: true },
  });
};

export const createNotificationRepo = (data) => {
  return prisma.notification.create({ data });
};