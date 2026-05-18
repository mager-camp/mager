import prisma from '../../config/prisma.js';

export const createWorkoutLogRepo = (data) => {
  return prisma.workoutLog.create({
    data
  });
};

export const getWorkoutLogsRepo = (userId) => {
  return prisma.workoutLog.findMany({
    where: { userId },
    include: {
      userSchedule: {
        include: {
          activity: true
        }
      }
    },
    orderBy: {
      completedAt: 'desc'
    }
  });
};

export const getWorkoutLogByIdRepo = (id) => {
  return prisma.workoutLog.findUnique({
    where: { id }
  });
};

export const updateWorkoutLogRepo = (
  id,
  data
) => {
  return prisma.workoutLog.update({
    where: { id },
    data
  });
};

export const deleteWorkoutLogRepo = (id) => {
  return prisma.workoutLog.delete({
    where: { id }
  });
};

export const completeScheduleRepo = (
  scheduleId
) => {
  return prisma.userSchedule.update({
    where: { id: scheduleId },
    data: {
      status: 'completed'
    }
  });
};