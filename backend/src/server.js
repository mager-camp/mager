import 'dotenv/config';

import app from './app.js';
import env from './config/env.js';
import { startReminderJob } from './jobs/reminder.job.js';

startReminderJob();
app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

