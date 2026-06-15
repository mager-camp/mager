import prisma from "../../config/prisma.js";

export const createTicketRepo = (data) => {
  return prisma.supportTicket.create({ data });
};

export const getUserTicketsRepo = (userId) => {
  return prisma.supportTicket.findMany({
    where:   { userId },
    orderBy: { createdAt: "desc" },
  });
};