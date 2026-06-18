// readiness.service.js
import {
  getTodaySchedules,
  getRecentWorkoutLogs,
  getRecentSchedules,
  saveReadiness,
} from "./readiness.repository.js";

export async function calculateReadiness(userId) {
  let score = 80;
  const now = new Date();
  const startToday = new Date(now);
  startToday.setHours(0, 0, 0, 0);
  const endToday = new Date(now);
  endToday.setHours(23, 59, 59, 999);

  const schedules = await getTodaySchedules(userId, startToday, endToday);

  const hasHeavy = schedules.some((s) => s.intensity === "heavy");
  const hasMedium = schedules.some((s) => s.intensity === "medium");
  const hasLight = schedules.some((s) => s.intensity === "light");

  if (hasHeavy) score -= 10;
  else if (hasMedium) score -= 5;
  else if (hasLight) score += 5;

  const recoveryExists = schedules.some((s) => s.programType === "RECOVERY");
  if (recoveryExists) score += 10;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const logs = await getRecentWorkoutLogs(userId, sevenDaysAgo);
  const totalMinutes = logs.reduce((sum, log) => sum + log.durationMinutes, 0);

  if (totalMinutes > 800) score -= 10;
  else if (totalMinutes > 500) score -= 5;
  else if (totalMinutes < 200) score += 5;

  const recentSchedules = await getRecentSchedules(userId, sevenDaysAgo);
  const completedCount = recentSchedules.filter((s) => s.status === "completed").length;
  const completionRate = recentSchedules.length > 0 ? completedCount / recentSchedules.length : 0;

  if (completionRate >= 0.8) score += 5;
  else if (completionRate < 0.5) score -= 5;

  score = Math.max(0, Math.min(100, score));

  let level = "Rendah";
  if (score >= 80) level = "Optimal";
  else if (score >= 60) level = "Sedang";

  let message;
  if (score >= 80) message = "Kondisi tubuh Anda optimal dan siap menjalani latihan hari ini.";
  else if (score >= 60) message = "Tubuh Anda cukup siap berlatih. Perhatikan hidrasi dan pemulihan.";
  else message = "Kesiapan latihan sedang menurun. Pertimbangkan recovery atau latihan ringan.";

  // simpan ke history
  await saveReadiness(userId, score);

  return {
    score, level, message,
    metrics: { totalMinutes, completionRate: Math.round(completionRate * 100), recoveryToday: recoveryExists },
  };
}