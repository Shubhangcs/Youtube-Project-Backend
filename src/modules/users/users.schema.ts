import { password } from "bun";
import { z } from "zod/v3";

export const createUserSchema = z.object({
    full_name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(10).max(10),
    password: z.string(),
});

export const updateUserSchema = z.object({
    full_name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
});

export const updateProfileImageSchema = z.object({
    profile_image_url: z.string(),
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type UpdateProfileImageSchema = z.infer<typeof updateProfileImageSchema>;
export type LoginUserSchema = z.infer<typeof loginUserSchema>;