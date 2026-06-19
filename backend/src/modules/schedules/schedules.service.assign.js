import {
  createScheduleRepo,
  checkOverlapRepo,
  getAthletesRepo,
} from "./schedules.repository.js";

/**
 * Instructor assign jadwal ke userId tertentu.
 * Validasi sama seperti createSchedule tapi userId-nya dari param, bukan dari token.
 */
export const assignScheduleToUser = async (payload, targetUserId) => {
  const {
    activityId, scheduledAt, startAt, endAt,
    intensity, programType, notes, alarmEnabled, alarmAt,
  } = payload;

  const start = new Date(startAt);
  const end   = new Date(endAt);
  const now   = new Date();

  if (start < now) {
    const err = new Error("Tidak bisa membuat jadwal di waktu yang sudah lewat.");
    err.statusCode = 400;
    throw err;
  }

  if (end <= start) {
    const err = new Error("Jam selesai harus setelah jam mulai.");
    err.statusCode = 400;
    throw err;
  }

  // Cek overlap untuk target user (bukan instructor)
  const overlap = await checkOverlapRepo(targetUserId, start, end);
  if (overlap) {
    const err = new Error(
      `Jadwal atlet bentrok dengan sesi lain (${new Date(overlap.startAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} - ${new Date(overlap.endAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}).`
    );
    err.statusCode = 409;
    throw err;
  }

  return createScheduleRepo({
    userId:       targetUserId,
    activityId,
    scheduledAt:  new Date(scheduledAt),
    startAt:      start,
    endAt:        end,
    intensity,
    programType,
    notes,
    alarmEnabled: alarmEnabled ?? false,
    alarmAt:      alarmAt ? new Date(alarmAt) : null,
  });
};

export const getAthletes = async () => {
  return getAthletesRepo();
};