import prisma from "../../config/prisma.js";
export const createScheduleRepo = (data) => {
  return prisma.userSchedule.create({
    data,
    include: { activity: true },
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
    where: { id, userId },
  });
};

export const updateScheduleRepo = (id, userId, payload) =>
  prisma.userSchedule.update({
    where: {
      id,
      userId,
    },
    data: {
      ...payload,
    },
    include: {
      activity: true,
    },
  });
  
export const deleteScheduleRepo = (id, userId) => {
  return prisma.userSchedule.delete({
    where: { id, userId },
  });
};

// ── Cek apakah ada jadwal yang overlap dengan startAt-endAt baru ─────────────
// Overlap terjadi kalau: existingStart < newEnd AND existingEnd > newStart
export const checkOverlapRepo = (userId, startAt, endAt, excludeId = null) => {
  return prisma.userSchedule.findFirst({
    where: {
      userId,
      status: { notIn: ["completed", "skipped"] }, // jadwal selesai/skip ga dihitung
      ...(excludeId && { id: { not: excludeId } }),
      AND: [{ startAt: { lt: endAt } }, { endAt: { gt: startAt } }],
    },
    select: {
      id: true,
      startAt: true,
      endAt: true,
      activity: { select: { name: true } },
    },
  });
};

export const checkOverlapForUpdateRepo = async (
  scheduleId,
  userId,
  start,
  end,
) => {
  return prisma.userSchedule.findFirst({
    where: {
      userId,
      id: {
        not: scheduleId,
      },
      startAt: {
        lt: end,
      },
      endAt: {
        gt: start,
      },
    },
  });
};

export const getAthletesRepo = () => {
  return prisma.user.findMany({
    where: {
      role: { name: "user" },
      deletedAt: null,
    },
    select: {
      id:             true,
      fullName:       true,
      email:          true,
      profilePicture: true,
    },
    orderBy: { fullName: "asc" },
  });
};
 

export const getAllAthletesSchedulesRepo = () => {
  return prisma.userSchedule.findMany({
    where: {
      user: { role: { name: "user" } },
    },
    include: {
      activity: true,
      user: { select: { id: true, fullName: true } },
    },
    orderBy: { startAt: "asc" },
  });
};