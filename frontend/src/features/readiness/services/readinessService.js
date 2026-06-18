import api from "@/lib/api";

export async function getReadiness() {
  const { data } = await api.get("/readiness");
  return data;
}