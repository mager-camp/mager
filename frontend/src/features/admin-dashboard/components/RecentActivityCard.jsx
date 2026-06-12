function formatTime(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function buildActivities(users, premiumUsers) {
  const userActivities = users.map((user) => ({
    id: `user-${user.id}`,
    date: user.createdAt,
    text: `${user.fullName} mendaftar sebagai user.`,
    name: user.fullName,
  }));

  const premiumActivities = premiumUsers.map((item) => ({
    id: `premium-${item.id}`,
    date: item.date || item.createdAt,
    text: `${item.userName} membeli ${item.packageName}.`,
    name: item.userName,
  }));

  return [...userActivities, ...premiumActivities]
    .filter((item) => item.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
}

export default function RecentActivityCard({
  users = [],
  premiumUsers = [],
  loading,
  error,
}) {
  const activities = buildActivities(users, premiumUsers);

  return (
    <div className="side-card">
      <div className="side-card-header">Aktivitas Terkini</div>

      {loading ? (
        <div className="section-state">Memuat aktivitas terbaru...</div>
      ) : error ? (
        <div className="section-state error">
          <strong>Aktivitas gagal dimuat.</strong>
          <span>{error}</span>
        </div>
      ) : activities.length === 0 ? (
        <div className="section-state">Belum ada aktivitas terbaru.</div>
      ) : (
        <div className="activity-wrapper">
          <div className="day-divider">Terbaru</div>

          {activities.map((activity) => (
            <div className="activity-item" key={activity.id}>
              <i className="fa-solid fa-circle-user user-icon"></i>

              <div className="act-det">
                <p>
                  <strong>{activity.name}</strong>{" "}
                  {activity.text.replace(activity.name, "")}
                </p>
                <span>{formatTime(activity.date)} WIB</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
