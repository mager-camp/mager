import cron from "node-cron";
import prisma from "../config/prisma.js";
import { sendReminderNotification } from "../modules/notifications/services/notification.dispatcher.js";

let isRunning = false;

export const startReminderJob = () => {
  cron.schedule("* * * * *", async () => {
    if (isRunning) return;

    isRunning = true;

    try {
      console.log("🔄 Checking schedules...");

      const now = new Date();

      console.log("SERVER NOW:", new Date());

      const schedules = await prisma.userSchedule.findMany({
        where: {
          alarmEnabled: true,
          reminderSent: false,
          alarmAt: {
            lte: now,
          },
        },
        include: {
          user: true,
          activity: true,
        },
      });

      console.log("Schedules found:", schedules.length);

      for (const schedule of schedules) {
        console.log("📩 Sending WA to:", schedule.user.fullName);

        await sendReminderNotification(schedule);

        await prisma.userSchedule.update({
          where: {
            id: schedule.id,
          },
          data: {
            reminderSent: true,
          },
        });
      }
    } catch (err) {
      console.error("❌ Reminder Job Error:", err);
    } finally {
      isRunning = false;
    }
  });
};
