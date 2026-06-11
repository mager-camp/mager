import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from './courses.service.js';

import {
  createCourseSchema,
  updateCourseSchema
} from './courses.validation.js';


export const getAll = async (req, res, next) => {
  try {
    const { type } = req.query;
    const data = await getCourses({ type });
    res.json({ success: true, data });
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
      await getCourseById(
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

export const create = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await createCourse(
        req.user.id,
        req.body
      );

    res.status(201).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await updateCourse(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req,
  res,
  next
) => {
  try {
    await deleteCourse(
      req.params.id
    );

    res.json({
      success: true,
      message:
        'Course deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};