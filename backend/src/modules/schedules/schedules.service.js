import {
  createScheduleRepo,
  getSchedulesRepo,
  getScheduleByIdRepo,
  updateScheduleRepo,
  deleteScheduleRepo,
  checkOverlapRepo,
  checkOverlapForUpdateRepo,
} from "./schedules.repository.js";

export const createSchedule = async (payload, userId) => {
  const {
    activityId,
    scheduledAt,
    startAt,
    endAt,
    intensity,
    programType,
    notes,
    alarmEnabled,
    alarmAt,
  } = payload;

  const start = new Date(startAt);
  const end = new Date(endAt);
  const now = new Date();

  // ── Validasi 1: tidak boleh jadwal di masa lalu ──────────────────────────
  if (start < now) {
    const err = new Error(
      "Tidak bisa membuat jadwal di waktu yang sudah lewat.",
    );
    err.statusCode = 400;
    throw err;
  }

  // ── Validasi 2: endAt harus setelah startAt ──────────────────────────────
  if (end <= start) {
    const err = new Error("Jam selesai harus setelah jam mulai.");
    err.statusCode = 400;
    throw err;
  }

  // ── Validasi 3: cek overlap dengan jadwal existing ───────────────────────
  const overlap = await checkOverlapRepo(userId, start, end);
  if (overlap) {
    const err = new Error(
      `Jadwal bentrok dengan sesi lain (${new Date(overlap.startAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} - ${new Date(overlap.endAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}).`,
    );
    err.statusCode = 409;
    throw err;
  }

  return createScheduleRepo({
    userId,
    activityId,
    scheduledAt: new Date(scheduledAt),
    startAt: start,
    endAt: end,
    intensity,
    programType,
    notes,
    alarmEnabled: alarmEnabled ?? false,
    alarmAt: alarmAt ? new Date(alarmAt) : null,
  });
};

export const getSchedules = async (userId) => {
  return getSchedulesRepo(userId);
};

export const getScheduleById = async (id, userId) => {
  const schedule = await getScheduleByIdRepo(id, userId);
  if (!schedule) {
    const err = new Error("Schedule not found");
    err.statusCode = 404;
    throw err;
  }
  return schedule;
};

export const updateSchedule = async (id, userId, payload) => {
  const existing = await getScheduleById(id, userId);

  const start = payload.startAt ? new Date(payload.startAt) : existing.startAt;

  const end = payload.endAt ? new Date(payload.endAt) : existing.endAt;

  const now = new Date();

  // tidak boleh edit ke masa lalu
  if (start < now) {
    const err = new Error(
      "Tidak bisa menjadwalkan latihan di waktu yang sudah lewat.",
    );
    err.statusCode = 400;
    throw err;
  }

  // end harus setelah start
  if (end <= start) {
    const err = new Error("Jam selesai harus setelah jam mulai.");
    err.statusCode = 400;
    throw err;
  }

  const overlap = await checkOverlapForUpdateRepo(id, userId, start, end);

  if (overlap) {
    const err = new Error(
      `Jadwal bentrok dengan sesi lain (${new Date(
        overlap.startAt,
      ).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })} - ${new Date(overlap.endAt).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })}).`,
    );

    err.statusCode = 409;
    throw err;
  }

  if (existing.status === "completed") {
    throw new Error("Jadwal yang sudah selesai tidak dapat diubah.");
  }

  return updateScheduleRepo(id, userId, payload);
};
export const deleteSchedule = async (id, userId) => {
  await getScheduleById(id, userId);
  return deleteScheduleRepo(id);
};
