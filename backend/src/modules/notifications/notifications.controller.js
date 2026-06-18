import {
  getTodayNotifications,
  getUnreadNotifications,
  markAllRead,
  markOneRead,
} from "./notifications.service.js";

export const getToday = async (req, res, next) => {
  try {
    const data = await getTodayNotifications(req.user.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getUnread = async (req, res, next) => {
  try {
    const data = await getUnreadNotifications(req.user.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const markAll = async (req, res, next) => {
  try {
    await markAllRead(req.user.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const markOne = async (req, res, next) => {
  try {
    await markOneRead(req.params.id, req.user.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
