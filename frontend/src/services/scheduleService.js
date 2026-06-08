import api from "@/lib/api";

export const getSchedules = async () => {
  const response = await api.get("/schedules");
  return response.data.data;
};

export const createSchedule = async (payload) => {
  const response = await api.post(
    "/schedules",
    payload
  );

  return response.data.data;
};

export const updateSchedule = async (id, payload) => {
  const response = await api.patch(`/schedules/${id}`, payload);
  return response.data.data;
};

export const deleteSchedule = async (id) => {
  const response = await api.delete(`/schedules/${id}`);
  return response.data;
};

export const updateScheduleStatus = async (id, status) => {
  const response = await api.patch(`/schedules/${id}`, { status });
  return response.data.data;
};

