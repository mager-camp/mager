import {
  createScheduleRepo,
  getSchedulesRepo,
  getScheduleByIdRepo,
  updateScheduleRepo,
  deleteScheduleRepo
} from './schedules.repository.js';

export const createSchedule = async (payload, userId) => {
  const {
    activityId,
    scheduledAt,
    startAt,
    endAt,
    intensity,
    programType,
    notes,
  } = payload;

  // console.log("PAYLOAD SERVICE:", payload);

  return createScheduleRepo({
    userId,
    activityId,
    scheduledAt: new Date(scheduledAt),
    startAt: new Date(startAt),
    endAt: new Date(endAt),
    intensity,
    programType,
    notes,
  });
};

export const getSchedules = async (
  userId
) => {
  return getSchedulesRepo(userId);
};

export const getScheduleById = async (
  id,
  userId
) => {
  const schedule =
    await getScheduleByIdRepo(
      id,
      userId
    );

  if (!schedule) {
    throw new Error(
      'Schedule not found'
    );
  }

  return schedule;
};

export const updateSchedule =
  async (
    id,
    userId,
    payload
  ) => {
    await getScheduleById(id, userId);

    return updateScheduleRepo(
      id,
      userId,
      payload
    );
  };

export const deleteSchedule =
  async (id, userId) => {
    await getScheduleById(id, userId);

    return deleteScheduleRepo(id);
  };