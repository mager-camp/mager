import {
  getSummary,
  getWeeklyProgress,
  getMonthlyProgress,
} from "./dashboard.service.js";

export const summary = async (req, res, next) => {
  try {
    const data = await getSummary(req.user.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const weeklyProgress = async (req, res, next) => {
  try {
    const data = await getWeeklyProgress(req.user.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const monthlyProgress = async (req, res, next) => {
  try {
    const data = await getMonthlyProgress(req.user.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
