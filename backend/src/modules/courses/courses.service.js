import {
  getCoursesRepo,
  getCourseByIdRepo,
  createCourseRepo,
  updateCourseRepo,
  deleteCourseRepo,
} from "./courses.repository.js";

export const getCourses = async (filters = {}) => {
  return getCoursesRepo(filters);
};
export const getCourseById = async (id) => {
  const course = await getCourseByIdRepo(id);

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
};

export const createCourse = async (userId, payload) => {
  return createCourseRepo({
    ...payload,
    createdBy: userId,
  });
};

export const updateCourse = async (id, payload) => {
  return updateCourseRepo(id, payload);
};

export const deleteCourse = async (id) => {
  return deleteCourseRepo(id);
};
