import {
  getActivities,
  getActivityById
} from './activities.service.js';

export const getAll = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await getActivities();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await getActivityById(
        req.params.id
      );

    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};