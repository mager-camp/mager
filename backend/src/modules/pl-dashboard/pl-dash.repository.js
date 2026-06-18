import prisma from "../../config/prisma.js";

export const getDashboardStatsRepo = async () => {
  const [totalAtlet, totalCourse, totalSchedule] = await Promise.all([
    prisma.user.count({
      where: {
        roleId: 2,
      },
    }),

    prisma.course.count({
      where: {
        deletedAt: null,
      },
    }),

    prisma.userSchedule.count(),
  ]);

  return {
    totalAtlet,
    totalCourse,
    totalSchedule,
  };
};