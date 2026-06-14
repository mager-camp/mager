export const reminderTemplate = (user, activity, schedule) => {
  const formattedDate = new Date(schedule.startAt).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const intensityEmoji =
    {
      light: "🟢",
      medium: "🟡",
      heavy: "🔴",
    }[schedule.intensity] ?? "🔥";

  return `🏃 *Reminder Latihan MAGER*

Halo *${user.fullName}* 👋

Sesi latihanmu akan segera dimulai!

📌 *Aktivitas:* ${activity.name}
📅 *Waktu:* ${formattedDate} WIB
${intensityEmoji} *Intensitas:* ${schedule.intensity}
${schedule.notes ? `📝 *Catatan:* ${schedule.notes}` : ""}

Siapkan dirimu dan tetap konsisten 💪🔥

_Pesan otomatis dari MAGER_`;
};
