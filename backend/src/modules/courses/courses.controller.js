import {
  getCourses,
  getCourseWithProgress,
  createCourse,
  updateCourse,
  deleteCourse,
  completeModule,
} from './courses.service.js';

export const getAll = async (req, res, next) => {
  try {
    const { type } = req.query;
    const data = await getCourses({ type });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const data = await getCourseWithProgress(req.params.id, req.user?.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const data = await createCourse(req.user.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const data = await updateCourse(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteCourse(req.params.id);
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const markModuleComplete = async (req, res, next) => {
  try {
    const data = await completeModule(req.user.id, req.params.moduleId);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};