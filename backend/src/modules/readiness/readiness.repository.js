import prisma from "../../config/prisma.js";

export async function getTodaySchedules(
  userId,
  startToday,
  endToday
) {
  return prisma.userSchedule.findMany({
    where: {
      userId,
      scheduledAt: {
        gte: startToday,
        lte: endToday,
      },
    },
  });
}

export async function getRecentWorkoutLogs(
  userId,
  fromDate
) {
  return prisma.workoutLog.findMany({
    where: {
      userId,
      completedAt: {
        gte: fromDate,
      },
    },
  });
}

export async function getRecentSchedules(
  userId,
  fromDate
) {
  return prisma.userSchedule.findMany({
    where: {
      userId,
      scheduledAt: {
        gte: fromDate,
      },
    },
  });
}