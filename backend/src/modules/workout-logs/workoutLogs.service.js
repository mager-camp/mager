import {
  createWorkoutLogRepo,
  getWorkoutLogsRepo,
  getWorkoutLogByIdRepo,
  updateWorkoutLogRepo,
  deleteWorkoutLogRepo,
  completeScheduleRepo,
  getScheduleNotesRepo,
} from "./workoutLogs.repository.js";

export const createWorkoutLog = async (userId, payload) => {
  const schedule = await getScheduleNotesRepo(payload.userScheduleId);

  const data = await createWorkoutLogRepo({
    userScheduleId: payload.userScheduleId,
    userId,
    durationMinutes: payload.durationMinutes,
    notes: schedule?.notes ?? null,
  });

  await completeScheduleRepo(payload.userScheduleId);
  return data;
};

export const getWorkoutLogs = async (userId) => {
  try {
    const data = await getWorkoutLogsRepo(userId);

    console.log("WORKOUT LOGS:", data.length);

    return data;
  } catch (err) {
    console.error("GET WORKOUT LOGS ERROR");
    console.error(err);

    throw err;
  }
};
export const getWorkoutLogById = async (id) => {
  const data = await getWorkoutLogByIdRepo(id);

  if (!data) {
    throw new Error("Workout log not found");
  }

  return data;
};

export const updateWorkoutLog = async (id, payload) => {
  return updateWorkoutLogRepo(id, payload);
};

export const deleteWorkoutLog = async (id) => {
  return deleteWorkoutLogRepo(id);
};
