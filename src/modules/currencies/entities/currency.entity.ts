import z from 'zod';

const CurrencySchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string()
});

export type Currency = z.infer<typeof CurrencySchema>;
