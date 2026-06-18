import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { getPremiumStatus, getPeriodisasi } from "@/services/premiumService";

export const COURSE_KEYS = {
  premium: ['courses', 'premium'],
  detail: (id) => ['courses', id],
};


const getFreeCourses = async () => {
  const { data } = await api.get('/courses', { params: { type: 'premium' } });
  return data.data;
};

const getCourseDetail = async (id) => {
  const { data } = await api.get(`/courses/${id}`);
  return data.data;
};

const postCompleteModule = async (moduleId) => {
  const { data } = await api.post(`/courses/modules/${moduleId}/complete`);
  return data.data;
};

export function usePremiumCourses() {
  return useQuery({
    queryKey: COURSE_KEYS.free,
    queryFn: getFreeCourses,
    staleTime: 1000 * 60 * 10,
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

export function useCompleteModule(courseId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postCompleteModule,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: COURSE_KEYS.detail(courseId) });
    },
  });
}

export function usePremiumStatus() {
  return useQuery({
    queryKey: ["premium", "status"],
    queryFn:  getPremiumStatus,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePeriodisasi(enabled) {
  return useQuery({
    queryKey: ["premium", "periodisasi"],
    queryFn:  getPeriodisasi,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}