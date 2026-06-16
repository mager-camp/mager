import {
  getCoursesRepo,
  getCourseStatsRepo,
  getCourseByIdRepo,
  createCourseRepo,
  updateCourseRepo,
  deleteCourseRepo,
  getUserProgressRepo,
  completeModuleRepo,
} from "./courses.repository.js";

const ACTIVITY_NAMES = ["OBSTACLE", "ANGGAR", "TEMBAK", "RENANG", "LARI"];

const emptyStat = () => ({
  total: 0,
  currentMonth: 0,
  previousMonth: 0,
  monthlyDelta: 0,
});

const buildCategoryBucket = () => {
  return ACTIVITY_NAMES.reduce((result, name) => {
    result[name] = emptyStat();
    return result;
  }, {});
};

const isDateInRange = (date, start, end) => {
  if (!date) return false;

  const parsedDate = new Date(date);
  return parsedDate >= start && parsedDate < end;
};

const addToStat = (stat, course, dateRange) => {
  stat.total += 1;

  if (
    isDateInRange(
      course.createdAt,
      dateRange.startCurrentMonth,
      dateRange.startNextMonth
    )
  ) {
    stat.currentMonth += 1;
  }

  if (
    isDateInRange(
      course.createdAt,
      dateRange.startPreviousMonth,
      dateRange.startCurrentMonth
    )
  ) {
    stat.previousMonth += 1;
  }
};

const finalizeStat = (stat) => {
  stat.monthlyDelta = stat.currentMonth - stat.previousMonth;
  return stat;
};

const finalizeCategoryBucket = (bucket) => {
  Object.keys(bucket).forEach((key) => {
    finalizeStat(bucket[key]);
  });

  return bucket;
};

export const getCourses = async (filters = {}) => {
  return getCoursesRepo(filters);
};

export const getCourseStats = async () => {
  const courses = await getCourseStatsRepo();

  const now = new Date();

  const startCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const startPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const dateRange = {
    startCurrentMonth,
    startNextMonth,
    startPreviousMonth,
  };

  const stats = {
    total: emptyStat(),
    types: {
      free: emptyStat(),
      premium: emptyStat(),
    },
    categories: {
      all: buildCategoryBucket(),
      free: buildCategoryBucket(),
      premium: buildCategoryBucket(),
    },
  };

  courses.forEach((course) => {
    const type = course.type === "premium" ? "premium" : "free";
    const activityName = course.activity?.name;

    addToStat(stats.total, course, dateRange);
    addToStat(stats.types[type], course, dateRange);

    if (activityName) {
      if (!stats.categories.all[activityName]) {
        stats.categories.all[activityName] = emptyStat();
      }

      if (!stats.categories[type][activityName]) {
        stats.categories[type][activityName] = emptyStat();
      }

      addToStat(stats.categories.all[activityName], course, dateRange);
      addToStat(stats.categories[type][activityName], course, dateRange);
    }
  });

  finalizeStat(stats.total);
  finalizeStat(stats.types.free);
  finalizeStat(stats.types.premium);

  finalizeCategoryBucket(stats.categories.all);
  finalizeCategoryBucket(stats.categories.free);
  finalizeCategoryBucket(stats.categories.premium);

  return stats;
};

export const getCourseById = async (id) => {
  const course = await getCourseByIdRepo(id);

  if (!course) {
    throw new Error("Course not found");
  }

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

  return {
    ...course,
    modules,
  };
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

export const completeModule = async (userId, moduleId) => {
  return completeModuleRepo(userId, moduleId);
};