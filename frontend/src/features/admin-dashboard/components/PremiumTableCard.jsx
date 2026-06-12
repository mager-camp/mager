import { useState } from "react";

const PAGE_SIZE = 5;

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

function formatDate(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function getPaymentStatusClass(status) {
  if (status === "paid") return "sukses";
  if (status === "pending") return "pending";
  return "offline";
}

function getPaymentStatusLabel(status) {
  if (status === "paid") return "sukses";
  if (status === "pending") return "pending";
  return status || "-";
}

function matchesSearch(item, search) {
  const keyword = search.toLowerCase();

  return [item.userName, item.userEmail, item.packageName, item.invoiceNumber]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(keyword));
}

export default function PremiumTableCard({
  premiumUsers = [],
  loading,
  error,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filteredPremiumUsers = premiumUsers.filter((item) => {
    const matchSearch = search ? matchesSearch(item, search) : true;
    const matchStatus =
      statusFilter === "all" ? true : item.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPremiumUsers.length / PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filteredPremiumUsers.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setPage(1);
  }

  function handleStatusChange(event) {
    setStatusFilter(event.target.value);
    setPage(1);
  }

  return (
    <div className="table-card">
      <div className="table-card-top">
        <div className="table-card-header text-blue">User Premium Baru</div>

        <div className="table-tools">
          <input
            type="search"
            className="admin-table-input"
            placeholder="Cari user/paket..."
            value={search}
            onChange={handleSearchChange}
          />

          <select
            className="admin-table-select"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="all">Semua</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="section-state">Memuat data user premium...</div>
      ) : error ? (
        <div className="section-state error">
          <strong>Data premium gagal dimuat.</strong>
          <span>{error}</span>
        </div>
      ) : (
        <>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Pembelian</th>
                  <th>Harga</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.length === 0 ? (
                  <tr>
                    <td colSpan="5">Tidak ada data premium yang sesuai.</td>
                  </tr>
                ) : (
                  pageItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="user-cell">
                          <i className="fa-solid fa-circle-user"></i>{" "}
                          {item.userName}
                        </div>
                      </td>
                      <td>{item.packageName}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{formatDate(item.date)}</td>
                      <td>
                        <span
                          className={`status-badge ${getPaymentStatusClass(item.status)}`}
                        >
                          {getPaymentStatusLabel(item.status)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span className="table-count">
              Menampilkan {pageItems.length} dari {filteredPremiumUsers.length}{" "}
              transaksi
            </span>

            <div className="pagination-controls">
              <button
                type="button"
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
              >
                Sebelumnya
              </button>

              <span className="pagination-text">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((value) => Math.min(totalPages, value + 1))
                }
              >
                Berikutnya
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
