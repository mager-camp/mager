import { z } from "zod";

const highlightSchema = z.object({
  icon:  z.string().min(1),
  title: z.string().min(1),
  desc:  z.string().min(1),
  order: z.number().int().default(0),
});

const subModuleSchema = z.object({
  title:    z.string().min(1),
  durasi:   z.string().optional(),
  type:     z.enum(["video", "drill"]),
  order:    z.number().int(),
  videoUrl: z.string().url().optional().nullable(),
});

const moduleSchema = z.object({
  title:      z.string().min(1),
  durasi:     z.string().optional(),
  order:      z.number().int(),
  subModules: z.array(subModuleSchema).optional(),
});

export const createCourseSchema = z.object({
  activityId:    z.string().uuid("Activity wajib dipilih"),
  instructorId:  z.string().uuid().optional().nullable(),
  title:         z.string().min(3, "Judul minimal 3 karakter"),
  description:   z.string().min(1, "Deskripsi wajib diisi"),
  about:         z.string().optional().nullable(),
  totalDurasi:   z.string().optional().nullable(),
  type:          z.enum(["free", "premium"]),
  thumbnailUrl:  z.string().url("URL thumbnail tidak valid").optional().nullable(),
  introVideoUrl: z.string().url("URL intro video tidak valid").optional().nullable(),
  highlights:    z.array(highlightSchema).optional(),
  modules:       z.array(moduleSchema).optional(),
});

export const updateCourseSchema = createCourseSchema.partial();