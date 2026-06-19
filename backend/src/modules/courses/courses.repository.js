import prisma from "../../config/prisma.js";

const COURSE_INCLUDE = {
  instructor: { include: { user: { select: { fullName: true, profilePicture: true } } } },
  activity:   { select: { name: true } },
  highlights: { orderBy: { order: "asc" } },
  modules:    { orderBy: { order: "asc" }, include: { subModules: { orderBy: { order: "asc" } } } },
};

export const getCoursesRepo = (filters = {}) =>
  prisma.course.findMany({
    where:   { ...(filters.type && { type: filters.type }), deletedAt: null },
    include: COURSE_INCLUDE,
    orderBy: { createdAt: "desc" },
  });

export const getCourseStatsRepo = () =>
  prisma.course.findMany({
    where:  { deletedAt: null },
    select: { id: true, type: true, createdAt: true, activity: { select: { name: true } } },
  });

export const getCourseByIdRepo = (id) =>
  prisma.course.findUnique({ where: { id, deletedAt: null }, include: COURSE_INCLUDE });

// ── Create dengan nested highlights & modules ────────────────────────────────
export const createCourseWithRelationsRepo = async (courseData, highlights = [], modules = []) => {
  return prisma.course.create({
    data: {
      ...courseData,
      highlights: {
        create: highlights.map((h, i) => ({ ...h, order: h.order ?? i })),
      },
      modules: {
        create: modules.map((m, i) => ({
          title:  m.title,
          durasi: m.durasi,
          order:  m.order ?? i,
          subModules: {
            create: (m.subModules ?? []).map((s, j) => ({ ...s, order: s.order ?? j })),
          },
        })),
      },
    },
    include: COURSE_INCLUDE,
  });
};

// ── Update — replace highlights & modules ────────────────────────────────────
export const updateCourseWithRelationsRepo = async (id, courseData, highlights, modules) => {
  return prisma.$transaction(async (tx) => {
    // Update field dasar
    await tx.course.update({ where: { id }, data: courseData });

    // Replace highlights kalau dikirim
    if (highlights !== undefined) {
      await tx.courseHighlight.deleteMany({ where: { courseId: id } });
      if (highlights.length > 0) {
        await tx.courseHighlight.createMany({
          data: highlights.map((h, i) => ({ ...h, courseId: id, order: h.order ?? i })),
        });
      }
    }

    // Replace modules + submodules kalau dikirim
    if (modules !== undefined) {
      const existing = await tx.courseModule.findMany({ where: { courseId: id }, select: { id: true } });
      const moduleIds = existing.map((m) => m.id);
      await tx.subModule.deleteMany({ where: { moduleId: { in: moduleIds } } });
      await tx.courseModule.deleteMany({ where: { courseId: id } });

      for (const [i, m] of modules.entries()) {
        await tx.courseModule.create({
          data: {
            courseId: id,
            title:    m.title,
            durasi:   m.durasi,
            order:    m.order ?? i,
            subModules: {
              create: (m.subModules ?? []).map((s, j) => ({ ...s, order: s.order ?? j })),
            },
          },
        });
      }
    }

    return tx.course.findUnique({ where: { id }, include: COURSE_INCLUDE });
  });
};

export const updateCourseRepo = (id, data) =>
  prisma.course.update({ where: { id }, data, include: COURSE_INCLUDE });

export const deleteCourseRepo = (id) =>
  prisma.course.update({ where: { id }, data: { deletedAt: new Date() } });

export const getUserProgressRepo = (userId, courseId) =>
  prisma.userModuleProgress.findMany({
    where:  { userId, module: { courseId } },
    select: { moduleId: true },
  });

export const completeModuleRepo = (userId, moduleId) =>
  prisma.userModuleProgress.upsert({
    where:  { userId_moduleId: { userId, moduleId } },
    create: { userId, moduleId },
    update: { completedAt: new Date() },
  });