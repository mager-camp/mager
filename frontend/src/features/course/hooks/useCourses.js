import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const getFreeCourses = async () => {
  const { data } = await api.get("/courses", { params: { type: "regular" } });
  return data.data;
};

export function useFreeCourses() {
  return useQuery({
    queryKey: ["courses", "free"],
    queryFn: getFreeCourses,
    staleTime: 1000 * 60 * 10,
  });
}