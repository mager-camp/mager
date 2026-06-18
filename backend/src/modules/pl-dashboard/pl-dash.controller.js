import { getDashboardStats } from "./pl-dash.service.js";

export const getStats = async (req, res, next) => {
  try {
    const data = await getDashboardStats();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};