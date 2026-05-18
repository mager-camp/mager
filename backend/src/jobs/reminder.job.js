import cron from "node-cron";
import prisma from "../config/prisma.js";
import { sendReminderNotification } from "../modules/notifications/services/notification.dispatcher.js";

export const startReminderJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("🔄 Checking schedules...");

      const now = new Date();

      const schedules = await prisma.userSchedule.findMany({
        where: {
          alarmEnabled: true,
          reminderSent: false,
          alarmAt: {
            lte: new Date(),
          },
        },
        include: {
          user: true,
          activity: true,
        },
      });

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
    }
  });
};
