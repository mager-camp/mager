import { z } from 'zod';

export const createCourseSchema =
  z.object({
    title: z.string().min(3),
    description: z.string(),
    type: z.enum([
      'free',
      'premium'
    ]),
  });

export const updateCourseSchema =
  createCourseSchema.partial();