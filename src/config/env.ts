import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.string().default("8080"),
    JWT_SECRET: z.string().min(5),
    AWS_REGION: z.string().default("ap-south-1"),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_BUCKET_NAME: z.string(),
    ENV: z.enum(["development", "production", "testing"]),
});


export const env = envSchema.parse(process.env);
export type EnvType = z.infer<typeof envSchema>
