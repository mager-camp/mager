import prisma from "../../config/prisma.js";

// Mapping intensity workout yang baru selesai → recovery activities yang akan dijadwalkan
// Setiap item: { activityName, offsetHours dari waktu selesai workout, durationMinutes }
const RECOVERY_MAP = {
  heavy: [
    { activityName: "PIJAT",    offsetHours: 3,  durationMinutes: 60, intensity: "light" },
    { activityName: "MANDI_ES", offsetHours: 18, durationMinutes: 15, intensity: "light" }, // besok pagi
  ],
  medium: [
    { activityName: "ISTIRAHAT_AKTIF", offsetHours: 20, durationMinutes: 45, intensity: "light" },
  ],
  light: [], // sudah cukup ringan, ga perlu recovery tambahan
};

/**
 * Generate recovery schedules otomatis setelah workout completed.
 * Hanya berlaku untuk user premium.
 *
 * @param {string} userId
 * @param {object} completedSchedule - UserSchedule yang baru completed (harus include intensity, endAt)
 */
export async function generateRecoverySchedules(userId, completedSchedule) {
  // Cek status premium user
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isPremium: true, premiumExpiredAt: true },
  });

  const isPremiumActive =
    user?.isPremium && (!user.premiumExpiredAt || new Date(user.premiumExpiredAt) > new Date());

  if (!isPremiumActive) return [];

  const recoveryItems = RECOVERY_MAP[completedSchedule.intensity] ?? [];
  if (recoveryItems.length === 0) return [];

  const created = [];

  for (const item of recoveryItems) {
    const activity = await prisma.activityTemplate.findUnique({
      where: { name: item.activityName },
    });

    if (!activity) continue; // skip kalau activity belum di-seed

    const startAt = new Date(completedSchedule.endAt);
    startAt.setHours(startAt.getHours() + item.offsetHours);

    const endAt = new Date(startAt);
    endAt.setMinutes(endAt.getMinutes() + item.durationMinutes);

    const scheduledAt = new Date(startAt);
    scheduledAt.setHours(12, 0, 0, 0); // noon, konsisten dengan pola scheduledAt lain

    const newSchedule = await prisma.userSchedule.create({
      data: {
        userId,
        activityId:  activity.id,
        scheduledAt,
        startAt,
        endAt,
        intensity:   item.intensity,
        programType: "RECOVERY",
        notes:       "Dijadwalkan otomatis oleh sistem berdasarkan intensitas latihan terakhir Anda.",
      },
      include: { activity: true },
    });

    created.push(newSchedule);
  }

  return created;
}