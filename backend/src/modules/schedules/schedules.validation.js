import { z } from 'zod';

export const createScheduleSchema = z.object({
  activityId: z.string(),
  title: z.string().min(3).optional(),
  scheduledDate: z.string().datetime(),
  scheduledTime: z.string(),
  intensity: z.enum([
    'light',
    'medium',
    'heavy'
  ]),
  programType: z.enum([
    'CARDIO',
    'STRENGTH',
    'RECOVERY'
  ]),
  alarmTime: z.string().optional(),
  alarmEnabled: z.boolean().optional()
});

export const updateScheduleSchema =
  createScheduleSchema.partial();