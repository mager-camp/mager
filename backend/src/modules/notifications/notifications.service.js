import {
  getTodayNotificationsRepo,
  getUnreadNotificationsRepo,
  markAllReadRepo,
  markOneReadRepo,
  createNotificationRepo,
} from "./notifications.repository.js";

export const getTodayNotifications = async (userId) => {
  return getTodayNotificationsRepo(userId);
};

export const getUnreadNotifications = async (userId) => {
  return getUnreadNotificationsRepo(userId);
};

export const markAllRead = async (userId) => {
  return markAllReadRepo(userId);
};

export const markOneRead = async (id, userId) => {
  return markOneReadRepo(id, userId);
};

// Dipanggil dari reminder job setelah kirim WA
export const createReminderNotification = async (
  userId,
  scheduleId,
  activityName,
  startAt,
) => {
  const time = new Date(startAt).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });

  return createNotificationRepo({
    userId,
    scheduleId,
    title: `Latihan ${activityName} dimulai dalam`,
    message: `Sesi ${activityName} dijadwalkan pukul ${time} WIB. Siapkan dirimu!`,
    type: "reminder",
  });
};
