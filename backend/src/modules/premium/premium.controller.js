import { getPremiumStatus, getPeriodisasi } from "./premium.service.js";

export const status = async (req, res, next) => {
  try {
    const data = await getPremiumStatus(req.user.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const periodisasi = async (req, res, next) => {
  try {
    const data = await getPeriodisasi(req.user.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};