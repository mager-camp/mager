import prisma from "../../../config/prisma.js";
import { randomUUID } from "crypto";

export const createPremiumPaymentRepo = (data) => {
  return prisma.premiumPayment.create({ data });
};

export const getPremiumPaymentByInvoiceRepo = (invoiceNumber) => {
  return prisma.premiumPayment.findUnique({
    where: { invoiceNumber },
    include: { user: { select: { fullName: true, email: true } } },
  });
};


export const getPremiumPaymentByOrderIdRepo = (orderId) => {
  return prisma.premiumPayment.findUnique({ where: { orderId } });
};

export const updatePremiumPaymentStatusRepo = (orderId, data) => {
  return prisma.premiumPayment.update({ where: { orderId }, data });
};

export const getUserPremiumPaymentsRepo = (userId) => {
  return prisma.premiumPayment.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const activateUserPremiumRepo = (userId, expiredAt) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      isPremium: true,
      premiumExpiredAt: expiredAt,
    },
  });
};

export const generateInvoiceNumber = () => {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `INV-${num}`;
};

export const getLastPremiumPaymentRepo = (userId) => {
  return prisma.premiumPayment.findFirst({
    where:   { userId, status: "paid" },
    orderBy: { paidAt: "desc" },
  });
};