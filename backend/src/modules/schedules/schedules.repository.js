import prisma from '../../config/prisma.js';

export const createScheduleRepo = (
  data
) => {
  return prisma.userSchedule.create({
    data
  });
};

export const getSchedulesRepo = (
  userId
) => {
  return prisma.userSchedule.findMany({
    where: { userId },
    include: {
      activity: true
    },
    orderBy: {
      scheduledDate: 'asc'
    }
  });
};

export const getScheduleByIdRepo = (
  id,
  userId
) => {
  return prisma.userSchedule.findFirst({
    where: {
      id,
      userId
    }
  });
};

export const updateScheduleRepo = (
  id,
  userId,
  data
) => {
  return prisma.userSchedule.update({
    where: { id },
    data
  });
};

export const deleteScheduleRepo = (
  id
) => {
  return prisma.userSchedule.delete({
    where: { id }
  });
};