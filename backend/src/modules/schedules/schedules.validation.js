import { z } from "zod";

export const createScheduleSchema = z.object({
  activityId: z.string(),
  title: z.string().min(3).optional(),
  scheduledAt: z.string().datetime(),
  alarmAt: z.string().datetime().optional(),
  intensity: z.enum(["light", "medium", "heavy"]),
  programType: z.enum(["CARDIO", "STRENGTH", "RECOVERY"]),
  alarmEnabled: z.boolean().optional(),
});

export const updateScheduleSchema = createScheduleSchema.partial();
