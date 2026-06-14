import api from "@/lib/api";

export const createPremiumTransaction = async (packageKey = "1-bulan") => {
  const { data } = await api.post("/premium-payment/create", { packageKey });
  return data.data;
};

export const getInvoice = async (invoiceNumber) => {
  const { data } = await api.get(`/premium-payment/invoice/${invoiceNumber}`);
  return data.data;
};