import cron from "node-cron";
import prisma from "../config/prisma.js";
import { sendReminderNotification } from "../modules/notifications/services/notification.dispatcher.js";

let isRunning = false;

export const startReminderJob = () => {
  // Cek setiap menit
  cron.schedule("* * * * *", async () => {
    if (isRunning) return;
    isRunning = true;

    try {
      const now = new Date();

      // Cari semua schedule yang:
      // - alarm aktif
      // - belum dikirim
      // - alarmAt sudah lewat (atau sama dengan sekarang)
      // - status belum completed/skipped
      const schedules = await prisma.userSchedule.findMany({
        where: {
          alarmEnabled:  true,
          reminderSent:  false,
          status:        { notIn: ["completed", "skipped"] },
          alarmAt: {
            lte: now,
            // Batasi window 1 jam ke belakang biar ga kirim notif
            // untuk jadwal yang sudah lama terlewat
            gte: new Date(now.getTime() - 60 * 60 * 1000),
          },
        },
        include: {
          user:     { select: { id: true, fullName: true, phone: true } },
          activity: { select: { name: true } },
        },
      });

      if (schedules.length === 0) return;

      console.log(`🔔 ${schedules.length} reminder akan dikirim...`);

      const results = await Promise.allSettled(
        schedules.map(async (schedule) => {
          if (!schedule.user.phone) {
            console.warn(`⚠️  User ${schedule.user.fullName} tidak punya nomor telepon, skip.`);
            return;
          }

          await sendReminderNotification(schedule);

          await prisma.userSchedule.update({
            where: { id: schedule.id },
            data:  { reminderSent: true },
          });

          console.log(`✅ Reminder terkirim ke ${schedule.user.fullName}`);
        })
      );

      // Log yang gagal tanpa crash job
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`❌ Gagal kirim ke ${schedules[i].user.fullName}:`, r.reason?.message);
        }
      });

    } catch (err) {
      console.error("❌ Reminder Job Error:", err.message);
    } finally {
      isRunning = false;
    }
  });

  console.log("⏰ Reminder job aktif — cek setiap menit");
};