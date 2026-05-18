import {
  getActivitiesRepo,
  getActivityByIdRepo
} from './activities.repository.js';

export const getActivities =
  async () => {
    return getActivitiesRepo();
  };

export const getActivityById =
  async (id) => {
    const activity =
      await getActivityByIdRepo(id);

    if (!activity) {
      throw new Error(
        'Activity not found'
      );
    }

    return activity;
  };