import { createTicketRepo, getUserTicketsRepo } from "./support.repository.js";

export const createTicket = async (userId, payload) => {
  return createTicketRepo({
    userId,
    jenisMasalah: payload.jenisMasalah,
    subjek:       payload.subjek,
    deskripsi:    payload.deskripsi,
  });
};

export const getUserTickets = async (userId) => {
  return getUserTicketsRepo(userId);
};