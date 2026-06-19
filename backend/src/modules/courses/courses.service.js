import {
  getCoursesRepo,
  getCourseStatsRepo,
  getCourseByIdRepo,
  createCourseWithRelationsRepo,
  updateCourseWithRelationsRepo,
  deleteCourseRepo,
  getUserProgressRepo,
  completeModuleRepo,
} from "./courses.repository.js";

const ACTIVITY_NAMES = ["OBSTACLE", "ANGGAR", "TEMBAK", "RENANG", "LARI"];
const emptyStat = () => ({ total: 0, currentMonth: 0, previousMonth: 0, monthlyDelta: 0 });
const buildCategoryBucket = () => ACTIVITY_NAMES.reduce((r, n) => { r[n] = emptyStat(); return r; }, {});
const isDateInRange = (date, start, end) => date && new Date(date) >= start && new Date(date) < end;

const addToStat = (stat, course, dr) => {
  stat.total += 1;
  if (isDateInRange(course.createdAt, dr.startCurrentMonth,  dr.startNextMonth))     stat.currentMonth  += 1;
  if (isDateInRange(course.createdAt, dr.startPreviousMonth, dr.startCurrentMonth))  stat.previousMonth += 1;
};

const finalizeStat          = (s) => { s.monthlyDelta = s.currentMonth - s.previousMonth; return s; };
const finalizeCategoryBucket = (b) => { Object.keys(b).forEach((k) => finalizeStat(b[k])); return b; };

export const getCourses = async (filters = {}) => getCoursesRepo(filters);

export const getCourseStats = async () => {
  const courses = await getCourseStatsRepo();
  const now     = new Date();
  const dr      = {
    startCurrentMonth:  new Date(now.getFullYear(), now.getMonth(), 1),
    startNextMonth:     new Date(now.getFullYear(), now.getMonth() + 1, 1),
    startPreviousMonth: new Date(now.getFullYear(), now.getMonth() - 1, 1),
  };
  const stats = {
    total:      emptyStat(),
    types:      { free: emptyStat(), premium: emptyStat() },
    categories: { all: buildCategoryBucket(), free: buildCategoryBucket(), premium: buildCategoryBucket() },
  };
  courses.forEach((course) => {
    const type         = course.type === "premium" ? "premium" : "free";
    const activityName = course.activity?.name;
    addToStat(stats.total,        course, dr);
    addToStat(stats.types[type],  course, dr);
    if (activityName) {
      if (!stats.categories.all[activityName])   stats.categories.all[activityName]   = emptyStat();
      if (!stats.categories[type][activityName]) stats.categories[type][activityName] = emptyStat();
      addToStat(stats.categories.all[activityName],   course, dr);
      addToStat(stats.categories[type][activityName], course, dr);
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
  if (!course) throw new Error("Course not found");
  return course;
};

export const getCourseWithProgress = async (id, userId) => {
  const course      = await getCourseById(id);
  const progress    = await getUserProgressRepo(userId, id);
  const completedIds = new Set(progress.map((p) => p.moduleId));
  return {
    ...course,
    modules: course.modules.map((mod, idx) => ({
      ...mod,
      locked:    idx === 0 ? false : !completedIds.has(course.modules[idx - 1].id),
      completed: completedIds.has(mod.id),
    })),
  };
};

export const createCourse = async (userId, payload) => {
  const { highlights = [], modules = [], ...courseData } = payload;
  return createCourseWithRelationsRepo({ ...courseData, createdBy: userId }, highlights, modules);
};

export const updateCourse = async (id, payload) => {
  const { highlights, modules, ...courseData } = payload;
  return updateCourseWithRelationsRepo(id, courseData, highlights, modules);
};

export const deleteCourse = async (id) => deleteCourseRepo(id);

export const completeModule = async (userId, moduleId) => completeModuleRepo(userId, moduleId);