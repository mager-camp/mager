import {
  createWorkoutLog,
  getWorkoutLogs,
  getWorkoutLogById,
  updateWorkoutLog,
  deleteWorkoutLog,
  getAllWorkoutLogs,
} from "./workoutLogs.service.js";

import {
  createWorkoutLogSchema,
  updateWorkoutLogSchema,
} from "./workoutLogs.validation.js";

export const create = async (req, res, next) => {
  // console.log("WORKOUT LOG BODY:", req.body);
  try {
    const data = await createWorkoutLog(req.user.id, req.body);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const data = await getWorkoutLogs(req.user.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const data = await getWorkoutLogById(req.params.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const data = await updateWorkoutLog(req.params.id, req.body);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteWorkoutLog(req.params.id);

    res.json({
      success: true,
      message: "Workout log deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllForAdmin = async (req, res, next) => {
  try {
    const data = await getAllWorkoutLogs();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};