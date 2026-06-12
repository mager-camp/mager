import { useState } from "react";

const PAGE_SIZE = 5;

function getPlanLabel(plan) {
  return plan === "premium" ? "Premium" : "Biasa";
}

function getStatusClass(status) {
  if (status === "active") return "aktif";
  if (status === "deleted") return "suspend";
  return "offline";
}

function getStatusLabel(status) {
  if (status === "active") return "Aktif";
  if (status === "deleted") return "Dihapus";
  return status || "-";
}

function matchesSearch(user, search) {
  const keyword = search.toLowerCase();

  return [user.fullName, user.email, user.phone]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(keyword));
}

export default function UserTableCard({ users = [], loading, error }) {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filteredUsers = users.filter((user) => {
    const matchSearch = search ? matchesSearch(user, search) : true;
    const matchPlan = planFilter === "all" ? true : user.plan === planFilter;

    return matchSearch && matchPlan;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filteredUsers.slice(startIndex, startIndex + PAGE_SIZE);

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setPage(1);
  }

  function handlePlanChange(event) {
    setPlanFilter(event.target.value);
    setPage(1);
  }

  return (
    <div className="table-card">
      <div className="table-card-top">
        <div className="table-card-header">Informasi User</div>

        <div className="table-tools">
          <input
            type="search"
            className="admin-table-input"
            placeholder="Cari nama/email..."
            value={search}
            onChange={handleSearchChange}
          />

          <select
            className="admin-table-select"
            value={planFilter}
            onChange={handlePlanChange}
          >
            <option value="all">Semua</option>
            <option value="regular">Biasa</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="section-state">Memuat data user...</div>
      ) : error ? (
        <div className="section-state error">
          <strong>Data user gagal dimuat.</strong>
          <span>{error}</span>
        </div>
      ) : (
        <>
          <div className="table-scroll user-table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Pengguna</th>
                  <th>Email</th>
                  <th>Telpon</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.length === 0 ? (
                  <tr>
                    <td colSpan="5">Tidak ada data user yang sesuai.</td>
                  </tr>
                ) : (
                  pageItems.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <i className="fa-solid fa-circle-user"></i>{" "}
                          {user.fullName}
                        </div>
                      </td>
                      <td>{getPlanLabel(user.plan)}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || "-"}</td>
                      <td>
                        <span
                          className={`status-badge ${getStatusClass(user.status)}`}
                        >
                          {getStatusLabel(user.status)}
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
              Menampilkan {pageItems.length} dari {filteredUsers.length} user
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
