import { createTicket, getUserTickets } from "./support.service.js";

export const create = async (req, res, next) => {
  try {
    const data = await createTicket(req.user.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getMyTickets = async (req, res, next) => {
  try {
    const data = await getUserTickets(req.user.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};