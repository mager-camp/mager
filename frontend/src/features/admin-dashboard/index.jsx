import "@/index.css";
import "./adminDashboard.css";

import StatCardsSection from "./components/StatCardsSection";
import UserTableCard from "./components/UserTableCard";
import PremiumTableCard from "./components/PremiumTableCard";
import StatistikChartCard from "./components/StatistikChartCard";
import RecentActivityCard from "./components/RecentActivityCard";
import { useAdminDashboard } from "./hooks/useAdminDashboard";

export default function AdminDashboard() {
  const { summary, users, premiumUsers, statistics, loading, error, refetch } =
    useAdminDashboard();

  return (
    <div className="admin-dashboard-screen">
      <header className="admin-dashboard-sticky-header">
        <div className="admin-dashboard-heading">
          <h2 className="welcome-text">Haloo, Admin!</h2>

          <button
            type="button"
            className="admin-refresh-btn"
            onClick={refetch}
            disabled={
              loading.summary ||
              loading.users ||
              loading.premiumUsers ||
              loading.statistics
            }
          >
            Refresh data
          </button>
        </div>
      </header>

      <section className="admin-dashboard-page">
        <div className="dashboard-grid">
          <div className="left-column">
            <StatCardsSection
              summary={summary}
              loading={loading.summary}
              error={error.summary}
            />

            <UserTableCard
              users={users}
              loading={loading.users}
              error={error.users}
            />

            <PremiumTableCard
              premiumUsers={premiumUsers}
              loading={loading.premiumUsers}
              error={error.premiumUsers}
            />
          </div>

          <div className="right-column">
            <StatistikChartCard
              statistics={statistics}
              loading={loading.statistics}
              error={error.statistics}
            />

            <RecentActivityCard
              users={users}
              premiumUsers={premiumUsers}
              loading={loading.users || loading.premiumUsers}
              error={error.users || error.premiumUsers}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
