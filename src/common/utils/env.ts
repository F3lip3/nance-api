import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  CACHE_URL: z.string().url(),
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string()
});

export const env = envSchema.parse(process.env);
