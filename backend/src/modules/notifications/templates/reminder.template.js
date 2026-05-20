export const reminderTemplate = (
  user,
  activity,
  schedule
) => {
  const formattedDate =
    new Date(
      schedule.scheduledAt
    ).toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return `🏃 Reminder

Halo ${user.fullName} 👋

📌 Aktivitas: ${activity.name}
📅 Jadwal: ${formattedDate} WIB
🔥 Intensitas: ${schedule.intensity}

Jangan lupa latihan ya, tetap konsisten 💪🔥`;
};