import prisma from "../../config/prisma.js";

export const createScheduleRepo = (data) => {
  return prisma.userSchedule.create({
    data,
    include: {
      activity: true,
    },
  });
};

export const getSchedulesRepo = (userId) => {
  return prisma.userSchedule.findMany({
    where: { userId },
    include: {
      activity: true,
      workoutLogs: {
        take: 1,
        orderBy: { completedAt: "desc" },
      },
    },
    orderBy: { startAt: "asc" },
  });
};

export const getScheduleByIdRepo = (id, userId) => {
  return prisma.userSchedule.findFirst({
    where: {
      id,
      userId,
    },
  });
};

export const updateScheduleRepo = (id, userId, data) => {
  return prisma.userSchedule.update({
    where: {
      id,
      userId,
    },
    data,
    include: { activity: true },
  });
};

export const deleteScheduleRepo = (id, userId) => {
  return prisma.userSchedule.delete({
    where: {
      id,
      userId,
    },
  });
};
