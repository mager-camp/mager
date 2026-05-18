import { z } from 'zod';

export const createWorkoutLogSchema = z.object({
  userScheduleId: z.string().uuid(),
  durationMinutes: z.number().int().positive(),
  caloriesBurned: z.number().int().nonnegative().optional(),
  distanceKm: z.number().nonnegative().optional(),
  notes: z.string().optional()
});

export const updateWorkoutLogSchema =
  createWorkoutLogSchema.partial();