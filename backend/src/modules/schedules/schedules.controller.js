import {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} from "./schedules.service.js";

import {
  createScheduleSchema,
  updateScheduleSchema,
} from "./schedules.validation.js";

export const create = async (req, res, next) => {  
  try {
    const payload = createScheduleSchema.parse(req.body);

    const result = await createSchedule(payload, req.user.id);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
  // console.log("REQ BODY:", req.body);
};

export const getAll = async (req, res, next) => {
  try {
    const result = await getSchedules(req.user.id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const result = await getScheduleById(req.params.id, req.user.id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const payload = updateScheduleSchema.parse(req.body);

    const result = await updateSchedule(
      req.params.id,
      req.user.id,
      payload,
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteSchedule(req.params.id, req.user.id);

    res.json({
      success: true,
      message: "Schedule deleted",
    });
  } catch (error) {
    next(error);
  }
};
