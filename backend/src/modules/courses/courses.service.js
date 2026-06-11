import {
  getCoursesRepo,
  getCourseByIdRepo,
  createCourseRepo,
  updateCourseRepo,
  deleteCourseRepo,
  getUserProgressRepo,
  completeModuleRepo,
} from './courses.repository.js';

export const getCourses = async (filters = {}) => {
  return getCoursesRepo(filters);
};

export const getCourseById = async (id) => {
  const course = await getCourseByIdRepo(id);
  if (!course) throw new Error('Course not found');
  return course;
};

export const getCourseWithProgress = async (id, userId) => {
  const course = await getCourseById(id);
  const progress = await getUserProgressRepo(userId, id);
  const completedIds = new Set(progress.map((p) => p.moduleId));

  const modules = course.modules.map((mod, idx) => ({
    ...mod,
    locked: idx === 0 ? false : !completedIds.has(course.modules[idx - 1].id),
    completed: completedIds.has(mod.id),
  }));

  return { ...course, modules };
};

export const createCourse = async (userId, payload) => {
  return createCourseRepo({ ...payload, createdBy: userId });
};

export const updateCourse = async (id, payload) => {
  return updateCourseRepo(id, payload);
};

export const deleteCourse = async (id) => {
  return deleteCourseRepo(id);
};

export const completeModule = async (userId, moduleId) => {
  return completeModuleRepo(userId, moduleId);
};