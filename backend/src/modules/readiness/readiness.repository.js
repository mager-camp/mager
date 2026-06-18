import prisma from "../../config/prisma.js";

export async function getTodaySchedules(userId, startToday, endToday) {
  return prisma.userSchedule.findMany({
    where: { userId, scheduledAt: { gte: startToday, lte: endToday } },
  });
}

export async function getRecentWorkoutLogs(userId, fromDate) {
  return prisma.workoutLog.findMany({
    where: { userId, completedAt: { gte: fromDate } },
  });
}

export async function getRecentSchedules(userId, fromDate) {
  return prisma.userSchedule.findMany({
    where: { userId, scheduledAt: { gte: fromDate } },
  });
}

export async function saveReadiness(userId, score) {
  return prisma.userReadiness.create({
    data: { userId, score },
  });
}

export async function getAllAthletesWithReadiness() {
  const athletes = await prisma.user.findMany({
    where: {
      deletedAt: null,
      role: { name: 'user' },
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      profilePicture: true,
      isPremium: true,
      readinessHistory: {
        orderBy: { calculatedAt: 'desc' },
        take: 1,
        select: { score: true, calculatedAt: true },
      },
    },
    orderBy: { fullName: 'asc' },
  });

  return athletes.map((a) => {
    const latest = a.readinessHistory[0] ?? null;
    const score = latest?.score ?? null;
    let level = null;
    if (score !== null) {
      if (score >= 80) level = 'Optimal';
      else if (score >= 60) level = 'Sedang';
      else level = 'Rendah';
    }
    return {
      id: a.id,
      fullName: a.fullName,
      email: a.email,
      profilePicture: a.profilePicture,
      isPremium: a.isPremium,
      readiness: score !== null ? { score, level, calculatedAt: latest.calculatedAt } : null,
    };
  });
}