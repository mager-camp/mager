import {
  getDashboard,
  getAtletList,
  getKursusList,
  getJadwalList,
} from "./pelatih.service.js";

export const dashboard = async (req, res, next) => {
  try {
    const data = await getDashboard(req.user.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const atletList = async (req, res, next) => {
  try {
    const data = await getAtletList();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const kursusList = async (req, res, next) => {
  try {
    const data = await getKursusList(req.user.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const jadwalList = async (req, res, next) => {
  try {
    const data = await getJadwalList();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
