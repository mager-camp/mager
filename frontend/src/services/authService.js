import api from "@/lib/api";

export const login = async (payload) => {
  const response = await api.post("/auth/login", payload);

  return response.data;
};

export const register = async (payload) => {
  const response = await api.post("/auth/register", payload);

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const googleLogin = async (credential) => {
  const { data } = await api.post('/auth/google', { credential });
  return data;
};