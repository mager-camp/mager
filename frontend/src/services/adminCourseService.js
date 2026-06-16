import api from "@/lib/api";

export const getAdminCourses = async () => {
  const response = await api.get("/courses");
  return response.data.data;
};

export const getActivities = async () => {
  const response = await api.get("/activities");
  return response.data.data;
};

export const createAdminCourse = async (payload) => {
  const response = await api.post("/courses", payload);
  return response.data.data;
};

export const updateAdminCourse = async (id, payload) => {
  const response = await api.patch(`/courses/${id}`, payload);
  return response.data.data;
};

export const deleteAdminCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data.data;
};
