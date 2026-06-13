import prisma from "../../config/prisma.js";

export const getUserPremiumStatusRepo = (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { isPremium: true, premiumExpiredAt: true },
  });
};

// Schedules dengan programType RECOVERY, upcoming (>= sekarang)
export const getRecoverySchedulesRepo = (userId) => {
  return prisma.userSchedule.findMany({
    where: {
      userId,
      programType: "RECOVERY",
      startAt: { gte: new Date() },
    },
    include: { activity: true },
    orderBy: { startAt: "asc" },
    take: 5,
  });
};