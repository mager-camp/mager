import prisma from "../../config/prisma.js";

export const getSummaryRepo = async (userId) => {
  const totalSchedules = await prisma.userSchedule.count({
    where: { userId },
  });

  const completedSchedules = await prisma.userSchedule.count({
    where: {
      userId,
      status: "completed",
    },
  });

  const workoutLogs = await prisma.workoutLog.aggregate({
    where: { userId },
    _count: true,
    _sum: {
      caloriesBurned: true,
      distanceKm: true,
    },
  });

  return {
    totalSchedules,
    completedSchedules,
    totalWorkouts: workoutLogs._count,
    totalCaloriesBurned: workoutLogs._sum.caloriesBurned || 0,
    totalDistanceKm: workoutLogs._sum.distanceKm || 0,
  };
};

export const getWeeklyProgressRepo = async (userId) => {
  const result = await prisma.$queryRaw`
        SELECT 
          DATE("completedAt") as date,
          COUNT(*)::int as workouts
        FROM "WorkoutLog"
        WHERE "userId" = ${userId}
          AND "completedAt" IS NOT NULL
        GROUP BY DATE("completedAt")
        ORDER BY date ASC
      `;

  return result;
};

export const getMonthlyProgressRepo = async (userId) => {
  return prisma.$queryRaw`
      SELECT
        TO_CHAR("completedAt", 'YYYY-MM') as month,
        COUNT(*)::int as workouts
      FROM "WorkoutLog"
      WHERE "userId" = ${userId}
        AND "completedAt" IS NOT NULL
      GROUP BY TO_CHAR("completedAt", 'YYYY-MM')
      ORDER BY month ASC
    `;
};
