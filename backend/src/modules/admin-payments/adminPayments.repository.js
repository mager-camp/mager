import prisma from "../../config/prisma.js";

const toNumber = (value) => Number(value ?? 0);

export const getAdminPaymentSummaryRepo = async () => {
  const [totalRevenue, paidCount, pendingCount, failedCount, refundedCount] =
    await prisma.$transaction([
      prisma.premiumPayment.aggregate({
        where: { status: "paid" },
        _sum: { amount: true },
      }),
      prisma.premiumPayment.count({ where: { status: "paid" } }),
      prisma.premiumPayment.count({ where: { status: "pending" } }),
      prisma.premiumPayment.count({ where: { status: "failed" } }),
      prisma.premiumPayment.count({ where: { status: "refunded" } }),
    ]);

  return {
    totalRevenue: toNumber(totalRevenue._sum.amount),
    paidCount,
    pendingCount,
    failedCount,
    refundedCount,
    totalTransactions: paidCount + pendingCount + failedCount + refundedCount,
  };
};

export const getAdminPaymentTransactionsRepo = async ({ status } = {}) => {
  const where = {};

  if (status && status !== "all") {
    where.status = status;
  }

  return prisma.premiumPayment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
        },
      },
    },
  });
};

export const getPaymentMethodsRepo = async () => {
  return prisma.paymentMethod.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createPaymentMethodRepo = async (payload) => {
  return prisma.paymentMethod.create({
    data: {
      name: payload.name,
      category: payload.category,
      accountNumber: payload.accountNumber || null,
      accountName: payload.accountName || null,
      isActive: payload.isActive ?? true,
    },
  });
};

export const updatePaymentMethodRepo = async (id, payload) => {
  return prisma.paymentMethod.update({
    where: {
      id,
    },
    data: {
      ...(payload.name !== undefined && {
        name: payload.name,
      }),
      ...(payload.category !== undefined && {
        category: payload.category,
      }),
      ...(payload.accountNumber !== undefined && {
        accountNumber: payload.accountNumber,
      }),
      ...(payload.accountName !== undefined && {
        accountName: payload.accountName,
      }),
      ...(payload.isActive !== undefined && {
        isActive: payload.isActive,
      }),
    },
  });
};

export const deletePaymentMethodRepo = async (id) => {
  return prisma.paymentMethod.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
};