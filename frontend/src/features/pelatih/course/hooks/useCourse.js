import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { getDashboardStats } from "../services/courseServices";

export function useDashboardStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 5,
  });

  return {
    stats: data,
    isLoading,
  };
}


export const COURSE_KEYS = {
  all: ["courses"],
  free: ["courses", "free"],
  premium: ["courses", "premium"],
  detail: (id) => ["courses", id],
  stats: ["course-stats"],
};

const getCourses = async () => (await api.get("/courses")).data.data;
const getCourseDetail = async (id) =>
  (await api.get(`/courses/${id}`)).data.data;
const getCourseStats = async () => (await api.get("/courses/stats")).data.data;
const createCourseApi = async (body) =>
  (await api.post("/courses", body)).data.data;
const updateCourseApi = async ({ id, ...body }) =>
  (await api.patch(`/courses/${id}`, body)).data.data;
const deleteCourseApi = async (id) => (await api.delete(`/courses/${id}`)).data;
const completeModuleApi = async (moduleId) =>
  (await api.post(`/courses/modules/${moduleId}/complete`)).data.data;

export function useCourses() {
  return useQuery({
    queryKey: COURSE_KEYS.all,
    queryFn: getCourses,
    staleTime: 1000 * 60 * 5,
  });
}

const getFreeCourses = async () => {
  const { data } = await api.get('/courses', { params: { type: 'free' } });
  return data.data;
};

const getPremiumCourses = async () => {
  const { data } = await api.get('/courses', { params: { type: 'premium' } });
  return data.data;
};

export function useFreeCourses() {
  return useQuery({
    queryKey: COURSE_KEYS.free,
    queryFn: getFreeCourses,
    staleTime: 1000 * 60 * 10,
  });
}

export function usePremiumCourses() {
  return useQuery({
    queryKey: COURSE_KEYS.premium,
    queryFn: getPremiumCourses,
    staleTime: 1000 * 60 * 10,
  });
}

export function useCourseStats() {
  return useQuery({
    queryKey: COURSE_KEYS.stats,
    queryFn: getCourseStats,
    staleTime: 1000 * 60 * 5,
  });
}
export function useCourseDetail(id) {
  return useQuery({
    queryKey: COURSE_KEYS.detail(id),
    queryFn: () => getCourseDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCourseApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: COURSE_KEYS.all });
      qc.invalidateQueries({ queryKey: COURSE_KEYS.stats });
    },
  });
}

export function useUpdateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateCourseApi,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: COURSE_KEYS.all });
      qc.invalidateQueries({ queryKey: COURSE_KEYS.detail(vars.id) });
    },
  });
}

export function useDeleteCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCourseApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: COURSE_KEYS.all });
      qc.invalidateQueries({ queryKey: COURSE_KEYS.stats });
    },
  });
}

export function useCompleteModule(courseId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: completeModuleApi,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: COURSE_KEYS.detail(courseId) }),
  });
}

export function useCourseCounts() {
  const { data: courses = [], isLoading } = useCourses();

  const totalCourse = courses.length;
  const totalFreeCourse = courses.filter(
    (course) => course.type === "free"
  ).length;

  const totalPremiumCourse = courses.filter(
    (course) => course.type === "premium"
  ).length;

  return {
    totalCourse,
    totalFreeCourse,
    totalPremiumCourse,
    isLoading,
  };
}