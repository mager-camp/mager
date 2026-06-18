import { useQuery } from "@tanstack/react-query";
import {
  getPelatihDashboard,
  getPelatihAtlet,
  getPelatihKursus,
  getPelatihJadwal,
} from "@/services/pelatihService";

export const pelatihDashboardKeys = {
  dashboard: ["pelatih-dashboard"],
  atlet: ["pelatih-atlet"],
  kursus: ["pelatih-kursus"],
  jadwal: ["pelatih-jadwal"],
};

export const usePelatihDashboard = () =>
  useQuery({
    queryKey: pelatihDashboardKeys.dashboard,
    queryFn: getPelatihDashboard,
  });

export const usePelatihAtlet = () =>
  useQuery({
    queryKey: pelatihDashboardKeys.atlet,
    queryFn: getPelatihAtlet,
  });

export const usePelatihKursus = () =>
  useQuery({
    queryKey: pelatihDashboardKeys.kursus,
    queryFn: getPelatihKursus,
  });

export const usePelatihJadwal = () =>
  useQuery({
    queryKey: pelatihDashboardKeys.jadwal,
    queryFn: getPelatihJadwal,
  });
