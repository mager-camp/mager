import {
  createScheduleRepo,
  getSchedulesRepo,
  getScheduleByIdRepo,
  updateScheduleRepo,
  deleteScheduleRepo
} from './schedules.repository.js';

export const createSchedule = async (
  payload,
  userId
) => {
  return createScheduleRepo({
    ...payload,
    userId
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