import midtransClient from "midtrans-client";
import {
  createPremiumPaymentRepo,
  getPremiumPaymentByInvoiceRepo,
  getPremiumPaymentByOrderIdRepo,
  updatePremiumPaymentStatusRepo,
  activateUserPremiumRepo,
  generateInvoiceNumber,
  getLastPremiumPaymentRepo,
} from "./premium.payment.repository.js";
import prisma from "../../../config/prisma.js";

// Paket premium yang tersedia
export const PREMIUM_PACKAGES = {
  "1-bulan": {
    label:          "Paket Premium 1 Bulan",
    description:    "Akses penuh semua fasilitas & course latihan",
    price:          250000,
    durationMonths: 1,
  },
};

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey:    process.env.MIDTRANS_SERVER_KEY,
});

// ── Create transaction ────────────────────────────────────────────────────────
export const createPremiumTransaction = async (userId, packageKey = "1-bulan") => {
  const pkg = PREMIUM_PACKAGES[packageKey];
  if (!pkg) throw new Error("Paket tidak ditemukan");

  const user = await prisma.user.findUnique({
    where:  { id: userId },
    select: { fullName: true, email: true, phone: true },
  });

  const orderId = `MGR-${userId.slice(0, 8)}-${Date.now()}`;
  const invoiceNumber = generateInvoiceNumber();

  // Buat record payment dulu (status: pending)
  await createPremiumPaymentRepo({
    userId,
    orderId,
    invoiceNumber,
    packageKey,
    amount:    pkg.price,
    status:    "pending",
  });

  // Request snap token ke Midtrans
  const parameter = {
    transaction_details: {
      order_id:     orderId,
      gross_amount: pkg.price,
    },
    customer_details: {
      first_name: user.fullName,
      email:      user.email,
      phone:      user.phone ?? "",
    },
    item_details: [
      {
        id:       packageKey,
        price:    pkg.price,
        quantity: 1,
        name:     pkg.label,
      },
    ],
  };

  const snapResponse = await snap.createTransaction(parameter);

  return {
    snapToken:      snapResponse.token,
    snapUrl:        snapResponse.redirect_url,
    orderId,
    invoiceNumber,
    package:        pkg,
  };
};

// ── Handle Midtrans webhook ──────────────────────────────────────────────────
export const handleMidtransWebhook = async (notification) => {
  // Verifikasi signature dari Midtrans
  const verified = await snap.transaction.notification(notification);

  const {
    order_id:          orderId,
    transaction_status: txStatus,
    fraud_status:       fraudStatus,
    payment_type:       paymentType,
    transaction_time:   transactionTime,
  } = verified;

  const payment = await getPremiumPaymentByOrderIdRepo(orderId);
  if (!payment) throw new Error("Payment tidak ditemukan");

  // Tentukan status final
  let finalStatus = "pending";

  if (txStatus === "capture") {
    finalStatus = fraudStatus === "accept" ? "paid" : "failed";
  } else if (txStatus === "settlement") {
    finalStatus = "paid";
  } else if (["cancel", "deny", "expire"].includes(txStatus)) {
    finalStatus = "failed";
  } else if (txStatus === "pending") {
    finalStatus = "pending";
  }

  // Update payment record
  await updatePremiumPaymentStatusRepo(orderId, {
    status:        finalStatus,
    paymentMethod: paymentType ?? null,
    paidAt:        finalStatus === "paid" ? new Date(transactionTime) : null,
  });

  // Kalau paid, aktifkan premium
  if (finalStatus === "paid") {
    const pkg = PREMIUM_PACKAGES[payment.packageKey] ?? PREMIUM_PACKAGES["1-bulan"];

    const expiredAt = new Date();
    expiredAt.setMonth(expiredAt.getMonth() + pkg.durationMonths);

    await activateUserPremiumRepo(payment.userId, expiredAt);
  }

  return { orderId, status: finalStatus };
};

// ── Get invoice ──────────────────────────────────────────────────────────────
export const getInvoice = async (invoiceNumber, userId) => {
  const payment = await getPremiumPaymentByInvoiceRepo(invoiceNumber);

  if (!payment) throw new Error("Invoice tidak ditemukan");
  if (payment.userId !== userId) throw new Error("Unauthorized");

  const pkg = PREMIUM_PACKAGES[payment.packageKey] ?? PREMIUM_PACKAGES["1-bulan"];

  return {
    invoiceNumber:  payment.invoiceNumber,
    orderId:        payment.orderId,
    status:         payment.status,
    fullName:       payment.user.fullName,
    email:          payment.user.email,
    packageLabel:   pkg.label,
    packageDesc:    pkg.description,
    amount:         payment.amount,
    paymentMethod:  payment.paymentMethod ?? "—",
    paidAt:         payment.paidAt,
    createdAt:      payment.createdAt,
  };
};

export const getLastInvoice = async (userId) => {
  const payment = await getLastPremiumPaymentRepo(userId);
  if (!payment) return null;
  return { invoiceNumber: payment.invoiceNumber };
};