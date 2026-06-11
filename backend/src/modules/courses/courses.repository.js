import prisma from '../../config/prisma.js';

export const getCoursesRepo = (filters = {}) => {
  return prisma.course.findMany({
    where: {
      ...(filters.type && { type: filters.type }),
      deletedAt: null,
    },
    include: {
      instructor: { include: { user: { select: { fullName: true, profilePicture: true } } } },
      highlights: { orderBy: { order: 'asc' } },
      modules: {
        orderBy: { order: 'asc' },
        include: { subModules: { orderBy: { order: 'asc' } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const getCourseByIdRepo = (id) => {
  return prisma.course.findUnique({
    where: { id, deletedAt: null },
    include: {
      instructor: { include: { user: { select: { fullName: true, profilePicture: true } } } },
      highlights: { orderBy: { order: 'asc' } },
      modules: {
        orderBy: { order: 'asc' },
        include: { subModules: { orderBy: { order: 'asc' } } },
      },
    },
  });
};

export const createCourseRepo = (data) => {
  return prisma.course.create({ data });
};

export const updateCourseRepo = (id, data) => {
  return prisma.course.update({ where: { id }, data });
};

export const deleteCourseRepo = (id) => {
  return prisma.course.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

// ── Module progress ──────────────────────────────────────────────────────────

export const getUserProgressRepo = (userId, courseId) => {
  return prisma.userModuleProgress.findMany({
    where: {
      userId,
      module: { courseId },
    },
    select: { moduleId: true },
  });
};

export const completeModuleRepo = (userId, moduleId) => {
  return prisma.userModuleProgress.upsert({
    where: { userId_moduleId: { userId, moduleId } },
    create: { userId, moduleId },
    update: { completedAt: new Date() },
  });
};