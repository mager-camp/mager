import { z } from 'zod';

export const createWorkoutLogSchema = z.object({
  userScheduleId: z.string().uuid(),
  durationMinutes: z.number().int().positive(),
});

export const updateWorkoutLogSchema =
  createWorkoutLogSchema.partial();