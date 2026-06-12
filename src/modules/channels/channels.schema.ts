import { z } from "zod/v3";

export const createChannelsSchema = z.object({
    channel_name: z.string().min(3).max(30),
    channel_description: z.string().min(5).max(1000),
});

export type CreateChannelsSchema = z.infer<typeof createChannelsSchema>;