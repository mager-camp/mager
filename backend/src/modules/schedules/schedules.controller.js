import {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} from "./schedules.service.js";

import { getAllAthletesSchedulesRepo } from "./schedules.repository.js"

import {
  createScheduleSchema,
  updateScheduleSchema,
} from "./schedules.validation.js";

import { assignScheduleToUser, getAthletes as getAthletesService } from "./schedules.service.assign.js";

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

    const result = await updateSchedule(req.params.id, req.user.id, payload);

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


export const getAthletes = async (req, res, next) => {
  try {
    const data = await getAthletesService();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
 
// POST /schedules/instructor/assign/:userId
export const assignToUser = async (req, res, next) => {
  try {
    const payload     = createScheduleSchema.parse(req.body);
    const targetUserId = req.params.userId;
 
    const result = await assignScheduleToUser(payload, targetUserId);
 
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
 

export const getAllAthletesSchedules = async (req, res, next) => {
  try {
    const data = await getAllAthletesSchedulesRepo();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};