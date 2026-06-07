import { z } from "zod";

export const createScheduleSchema = z.object({
  activityId:    z.string(),
  title:         z.string().min(3).optional(),
  scheduledAt:   z.string().datetime(),
  startAt:       z.string().datetime(),       
  endAt:         z.string().datetime(),        
  alarmAt:       z.string().datetime().optional(),
  intensity:     z.enum(["light", "medium", "heavy"]),
  programType: z.enum(["TRAINING", "COMPETITION", "RECOVERY"]),
  alarmEnabled:  z.boolean().optional(),
  notes:        z.string().max(300).optional(),
});

export const updateScheduleSchema = createScheduleSchema.partial();