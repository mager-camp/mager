import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(6).optional(),
  profilePicture: z.string().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, "Password minimum 8 characters"),
});
