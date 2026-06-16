import { calculateReadiness } from "./readiness.service.js";

export async function getReadiness(req, res, next) {
  try {
    const readiness = await calculateReadiness(
      req.user.id
    );

    res.status(200).json(readiness);
  } catch (error) {
    next(error);
  }
}