import { getAllAthletesWithReadiness } from "../readiness/readiness.repository.js";

export const getAthletes = async (req, res, next) => {
  try {
    const data = await getAllAthletesWithReadiness();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};