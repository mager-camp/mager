import { sendWhatsApp } from '../channels/whatsapp.channel.js';
import { reminderTemplate } from '../templates/reminder.template.js';

export const sendReminderNotification = async (schedule) => {
  const message = reminderTemplate(
    schedule.user,
    schedule.activity,
    schedule
  );

  return sendWhatsApp(
    schedule.user.phone,
    message
  );
};