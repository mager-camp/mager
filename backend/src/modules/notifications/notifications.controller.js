import { getTodayNotifications } from './notifications.service.js';

export const getToday = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await getTodayNotifications(
        req.user.id
      );

    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};