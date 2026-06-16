// src/features/admin-management/index.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import UserTable from "./components/UserTable";
import CreateUserModal from "./components/CreateUserModal";
import DeactivateAccountModal from "./components/DeactivateAccountModal";
import DeactivateReasonModal from "./components/DeactivateReasonModal";
import DeactivateSuccessModal from "./components/DeactivateSuccessModal";
import DeleteAccountModal from "./components/DeleteAccountModal";
import UserProfileDetail from "./components/UserProfileDetail";
import EditUserProfile from "./components/EditUserProfile";
import UserPaymentHistory from "./components/UserPaymentHistory";
import UserInvoiceDetail from "./components/UserInvoiceDetail";
import {
  getAdminManagementUsers,
  getAdminUserDetail,
  createAdminUser,
  updateAdminUser,
  deactivateAdminUser,
  deleteAdminUser,
} from "@/services/adminManagementService";

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}

export default function AdminManagementFeature() {
  const [users, setUsers] = useState([]);
  const [selectedUserDetail, setSelectedUserDetail] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedUserDeactivate, setSelectedUserDeactivate] = useState(null);
  const [deactivateStep, setDeactivateStep] = useState(null);
  const [isDeactivateSuccessOpen, setIsDeactivateSuccessOpen] = useState(false);
  const [selectedUserRealDelete, setSelectedUserRealDelete] = useState(null);

  const [currentView, setCurrentView] = useState("list");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await getAdminManagementUsers();
      setUsers(response.data?.items ?? []);
    } catch (err) {
      setError(getErrorMessage(err, "Gagal memuat data user dari backend."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchUserDetail = useCallback(async (userId) => {
    if (!userId) return;

    try {
      setIsDetailLoading(true);
      setError("");
      const response = await getAdminUserDetail(userId);
      setSelectedUserDetail(response.data);
    } catch (err) {
      setError(getErrorMessage(err, "Gagal memuat detail user."));
    } finally {
      setIsDetailLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (["detail", "edit", "payment_history", "invoice"].includes(currentView)) {
      fetchUserDetail(selectedUserId);
    }
  }, [currentView, selectedUserId, fetchUserDetail]);

  const activeUsers = useMemo(
    () => users.filter((user) => user?.status === "active"),
    [users],
  );

  const inactiveUsers = useMemo(
    () => users.filter((user) => user?.status !== "active"),
    [users],
  );

  const handleAddUser = async (newUser) => {
    try {
      await createAdminUser({
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        password: newUser.password,
        userType: newUser.userType,
        profilePicture: newUser.profilePicture,
      });
      setIsAddModalOpen(false);
      await fetchUsers();
      alert("User baru berhasil disimpan ke backend.");
    } catch (err) {
      alert(getErrorMessage(err, "Gagal menyimpan user baru."));
    }
  };

  const openDeactivateConfirm = (userId) => {
    if (!userId) return;
    setSelectedUserDeactivate(userId);
    setDeactivateStep("confirm");
  };

  const closeDeactivateFlow = () => {
    setSelectedUserDeactivate(null);
    setDeactivateStep(null);
  };

  const handleDeactivateConfirmYes = () => {
    setDeactivateStep("reason");
  };

  const handleSubmitDeactivateReason = async (reason) => {
    if (!selectedUserDeactivate) return;

    const userId = selectedUserDeactivate;

    try {
      await deactivateAdminUser(userId, { reason });

      setSelectedUserDeactivate(null);
      setDeactivateStep(null);

      await fetchUsers();

      if (selectedUserId === userId) {
        await fetchUserDetail(userId);
        setCurrentView("detail");
      }

      setIsDeactivateSuccessOpen(true);
    } catch (err) {
      alert(getErrorMessage(err, "Gagal menonaktifkan akun."));
    }
  };

  const handleConfirmRealDelete = async () => {
    if (!selectedUserRealDelete) return;

    try {
      await deleteAdminUser(selectedUserRealDelete);
      setSelectedUserRealDelete(null);
      await fetchUsers();

      if (selectedUserId === selectedUserRealDelete) {
        setSelectedUserDetail(null);
        setCurrentView("list");
      }

      alert("Akun telah berhasil dihapus secara permanen dari database.");
    } catch (err) {
      alert(getErrorMessage(err, "Gagal menghapus akun secara permanen dari database."));
    }
  };

  const handleOpenDetail = (userId) => {
    setSelectedUserId(userId);
    setSelectedPayment(null);
    setCurrentView("list");
    handleOpenDetailReal(userId);
  };

  const handleOpenDetailReal = (userId) => {
    setSelectedUserId(userId);
    setSelectedPayment(null);
    setCurrentView("detail");
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      await updateAdminUser(selectedUserId, updatedData);
      await fetchUsers();
      await fetchUserDetail(selectedUserId);
      alert("Perubahan profil berhasil disimpan ke backend.");
      setCurrentView("detail");
    } catch (err) {
      alert(getErrorMessage(err, "Gagal menyimpan perubahan profil."));
    }
  };

  const renderDeactivateModals = () => (
    <>
      <DeactivateAccountModal
        isOpen={deactivateStep === "confirm"}
        onClose={closeDeactivateFlow}
        onConfirm={handleDeactivateConfirmYes}
      />

      <DeactivateReasonModal
        isOpen={deactivateStep === "reason"}
        onClose={closeDeactivateFlow}
        onConfirm={handleSubmitDeactivateReason}
      />

      <DeactivateSuccessModal
        isOpen={isDeactivateSuccessOpen}
        onClose={() => setIsDeactivateSuccessOpen(false)}
      />
    </>
  );

  if (currentView === "invoice") {
    return (
      <>
        <UserInvoiceDetail
          user={selectedUserDetail}
          payment={selectedPayment || selectedUserDetail?.payments?.[0]}
          onBack={() => setCurrentView("payment_history")}
        />
        {renderDeactivateModals()}
      </>
    );
  }

  if (currentView === "edit") {
    return (
      <main className="w-full min-h-screen bg-[#f8fafc] px-6 py-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {isDetailLoading ? (
            <div className="text-center py-12 text-[#4a7ca3] font-bold">
              Memuat detail user...
            </div>
          ) : (
            <EditUserProfile
              userId={selectedUserId}
              user={selectedUserDetail}
              onBack={() => setCurrentView("detail")}
              onSave={handleSaveEdit}
              onDeactivateClick={() => openDeactivateConfirm(selectedUserId)}
            />
          )}
        </div>
        {renderDeactivateModals()}
      </main>
    );
  }

  if (currentView === "payment_history") {
    return (
      <main className="w-full min-h-screen bg-[#f8fafc] px-6 py-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <UserPaymentHistory
            userId={selectedUserId}
            user={selectedUserDetail}
            payments={selectedUserDetail?.payments ?? []}
            onBack={() => setCurrentView("detail")}
            onPrintStrukClick={(payment) => {
              setSelectedPayment(payment || selectedUserDetail?.payments?.[0] || null);
              setCurrentView("invoice");
            }}
          />
        </div>
        {renderDeactivateModals()}
      </main>
    );
  }

  if (currentView === "detail") {
    return (
      <main className="w-full min-h-screen bg-[#f8fafc] px-6 py-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {isDetailLoading ? (
            <div className="text-center py-12 text-[#4a7ca3] font-bold">
              Memuat detail user...
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 text-sm font-semibold">
              {error}
            </div>
          ) : (
            <UserProfileDetail
              userId={selectedUserId}
              user={selectedUserDetail}
              onBack={() => setCurrentView("list")}
              onEditClick={() => setCurrentView("edit")}
              onPaymentHistoryClick={() => setCurrentView("payment_history")}
              onDeactivateClick={() => openDeactivateConfirm(selectedUserId)}
            />
          )}
        </div>
        {renderDeactivateModals()}
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#f8fafc] px-6 py-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1e3240] tracking-tight">
              Manajemen User
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Data tersambung ke endpoint backend admin.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#4a7ca3] hover:bg-[#3b6383] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
          >
            + Add User
          </button>
        </div>

        {error ? (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 text-sm font-semibold mb-6">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="text-center py-12 text-[#4a7ca3] font-bold">
            Memuat data user...
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                User Aktif
              </h3>
              <UserTable
                data={activeUsers}
                onDeleteTrigger={setSelectedUserRealDelete}
                onEditTrigger={handleOpenDetail}
                onUserClick={handleOpenDetail}
              />
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                User Offline & Suspend
              </h3>
              <UserTable
                data={inactiveUsers}
                onDeleteTrigger={setSelectedUserRealDelete}
                onEditTrigger={handleOpenDetail}
                onUserClick={handleOpenDetail}
              />
            </div>
          </>
        )}
      </div>

      <CreateUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddUser}
      />

      {renderDeactivateModals()}

      <DeleteAccountModal
        isOpen={selectedUserRealDelete !== null}
        onClose={() => setSelectedUserRealDelete(null)}
        onConfirm={handleConfirmRealDelete}
      />
    </main>
  );
}