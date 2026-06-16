import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import PaymentHeader from "./components/PaymentHeader";
import PaymentStats from "./components/PaymentStats";
import PaymentTable from "./components/PaymentTable";
import ActiveMethods from "./components/ActiveMethods";

import {
  getAdminPaymentSummary,
  getAdminPaymentTransactions,
  getAdminPaymentMethods,
  createAdminPaymentMethod,
  updateAdminPaymentMethod,
  deleteAdminPaymentMethod,
} from "@/services/adminPaymentService";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
};

const formatDate = (value) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
};

const formatTime = (value) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(value));
};

const mapStatusToLabel = (status) => {
  if (status === "paid") return "Sukses";
  if (status === "pending") return "Pending";
  if (status === "failed") return "Gagal";
  if (status === "refunded") return "Refund";
  return status || "-";
};

const mapLabelToStatus = (label) => {
  if (label === "Sukses") return "paid";
  if (label === "Pending") return "pending";
  if (label === "Gagal") return "failed";
  if (label === "Refund") return "refunded";
  return "all";
};

const mapTransactionToTable = (item) => {
  return {
    id: item.invoiceNumber,
    name: item.userName,
    email: item.userEmail,
    package: item.packageLabel,
    method: item.paymentMethod || "-",
    price: formatCurrency(item.amount),
    status: mapStatusToLabel(item.status),
    date: formatDate(item.createdAt),
    time: formatTime(item.createdAt),
  };
};

const mapMethodToCard = (item) => {
  const isBank = item.category === "bank_transfer";

  return {
    id: item.id,
    title: isBank ? "Virtual Account" : "E-Wallet",
    description: `${item.name}${item.accountNumber ? ` (${item.accountNumber})` : ""}`,
    raw: item,
  };
};

export default function PaymentManagementFeature() {
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState("Semua");

  const apiStatus = mapLabelToStatus(statusFilter);

  const summaryQuery = useQuery({
    queryKey: ["admin-payments", "summary"],
    queryFn: getAdminPaymentSummary,
  });

  const transactionQuery = useQuery({
    queryKey: ["admin-payments", "transactions", apiStatus],
    queryFn: () => getAdminPaymentTransactions(apiStatus),
  });

  const methodQuery = useQuery({
    queryKey: ["admin-payments", "methods"],
    queryFn: getAdminPaymentMethods,
  });

  const createMethodMutation = useMutation({
    mutationFn: createAdminPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-payments", "methods"],
      });
    },
  });

  const updateMethodMutation = useMutation({
    mutationFn: ({ id, payload }) => updateAdminPaymentMethod(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-payments", "methods"],
      });
    },
  });

  const deleteMethodMutation = useMutation({
    mutationFn: deleteAdminPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-payments", "methods"],
      });
    },
  });

  const transactions = useMemo(() => {
    return (transactionQuery.data?.items || []).map(mapTransactionToTable);
  }, [transactionQuery.data]);

  const activeMethodsList = useMemo(() => {
    return (methodQuery.data?.items || []).map(mapMethodToCard);
  }, [methodQuery.data]);

  const handleAddNewMethod = async (newMethod) => {
    const payload = {
      name: newMethod.bank,
      category: newMethod.jenis === "Bank" ? "bank_transfer" : "ewallet",
      accountNumber: newMethod.nomor,
      accountName: "MAGER",
      isActive: true,
    };

    await createMethodMutation.mutateAsync(payload);
  };

  const handleUpdateExistingMethod = async (updatedData) => {
    const payload = {
      name: updatedData.bank,
      category: updatedData.jenis === "Bank" ? "bank_transfer" : "ewallet",
      accountNumber: updatedData.nomor,
      accountName: "MAGER",
      isActive: true,
    };

    await updateMethodMutation.mutateAsync({
      id: updatedData.id,
      payload,
    });
  };

  const handleDeleteExistingMethod = async (id) => {
    await deleteMethodMutation.mutateAsync(id);
  };

  const isLoading =
    summaryQuery.isLoading ||
    transactionQuery.isLoading ||
    methodQuery.isLoading;

  const errorMessage =
    summaryQuery.error?.message ||
    transactionQuery.error?.message ||
    methodQuery.error?.message;

  return (
    <main className="w-full min-h-screen bg-[#f8fafc] px-6 py-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <PaymentHeader />

        {errorMessage && (
          <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            Data pembayaran gagal dimuat: {errorMessage}
          </div>
        )}

        <PaymentStats
          summary={summaryQuery.data}
          loading={summaryQuery.isLoading}
        />

        {isLoading ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 text-sm text-slate-400 font-semibold">
            Memuat data pembayaran...
          </div>
        ) : (
          <>
            <PaymentTable
              transactions={transactions}
              currentFilter={statusFilter}
              onFilterChange={setStatusFilter}
            />

            <ActiveMethods
              methods={activeMethodsList}
              onAddMethod={handleAddNewMethod}
              onUpdateMethod={handleUpdateExistingMethod}
              onDeleteMethod={handleDeleteExistingMethod}
              isSaving={
                createMethodMutation.isPending ||
                updateMethodMutation.isPending
              }
              isDeleting={deleteMethodMutation.isPending}
            />
          </>
        )}
      </div>
    </main>
  );
}