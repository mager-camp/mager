import {
  createWorkoutLogRepo,
  getWorkoutLogsRepo,
  getWorkoutLogByIdRepo,
  updateWorkoutLogRepo,
  deleteWorkoutLogRepo,
  completeScheduleRepo,
  getScheduleNotesRepo,
  getScheduleByIdRepo,
  getAllWorkoutLogsRepo,
} from "./workoutLogs.repository.js";

import { generateRecoverySchedules } from '../recovery/recoveryScheduler.service.js';

export const createWorkoutLog = async (userId, payload) => {
  const schedule = await getScheduleByIdRepo(payload.userScheduleId);
  const durationMinutes = Math.round(
    (Date.now() - new Date(schedule.startAt)) / 60000
  );

  const data = await createWorkoutLogRepo({
    userScheduleId: payload.userScheduleId,
    userId,
    durationMinutes,
    notes: schedule?.notes ?? null,
  });

  await completeScheduleRepo(payload.userScheduleId);
  const recoverySchedules = await generateRecoverySchedules(userId, schedule);
  
  return { ...data, recoverySchedules };
};

export const getWorkoutLogs = async (userId) => {
  return getWorkoutLogsRepo(userId);
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

export const getAllWorkoutLogs = async () => {
  return getAllWorkoutLogsRepo();
};