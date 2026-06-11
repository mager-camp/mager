import prisma from '../../config/prisma.js';

export const getCoursesRepo = (filters = {}) => {
  return prisma.course.findMany({
    where: {
      ...(filters.type && { type: filters.type }),
      deletedAt: null,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getCourseByIdRepo = (
  id
) => {
  return prisma.course.findUnique({
    where: { id }
  });
};

export const createCourseRepo = (
  data
) => {
  return prisma.course.create({
    data
  });
};

export const updateCourseRepo = (
  id,
  data
) => {
  return prisma.course.update({
    where: { id },
    data
  });
};

export const deleteCourseRepo = (
  id
) => {
  return prisma.course.delete({
    where: { id }
  });
};