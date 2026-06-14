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