import prisma from '../../config/prisma.js';

export const getActivitiesRepo = () => {
  return prisma.activityTemplate.findMany({
    orderBy: {
      createdAt: 'asc'
    }
  });
};

export const getActivityByIdRepo = (
  id
) => {
  return prisma.activityTemplate.findUnique({
    where: { id }
  });
};