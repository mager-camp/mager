import {
  countAtlet,
  countKursus,
  countJadwal,
  findAtlet,
  findKursus,
  findJadwal,
} from "./pelatih.repository.js";

export const getDashboard = async (userId) => {
  const totalAtlet = await countAtlet();
  const totalKursus = await countKursus(userId);
  const totalJadwal = await countJadwal();

  return {
    totalAtlet,
    totalKursus,
    totalJadwal,
  };
};

export const getAtletList = async () => {
  return findAtlet();
};

export const getKursusList = async (userId) => {
  return findKursus(userId);
};

export const getJadwalList = async () => {
  return findJadwal();
};