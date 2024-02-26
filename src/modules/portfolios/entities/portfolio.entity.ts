import z from 'zod';

export const PortfolioSchema = z.object({
  id: z.string(),
  name: z.string(),
  currency: z.object({
    code: z.string(),
    name: z.string()
  }),
  status: z.string()
});

export type PortfolioEntity = z.infer<typeof PortfolioSchema>;
