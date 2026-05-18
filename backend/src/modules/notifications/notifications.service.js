import { getTodayNotificationsRepo } from './notifications.repository.js';

export const getTodayNotifications =
  async (userId) => {
    return getTodayNotificationsRepo(
      userId
    );
  };