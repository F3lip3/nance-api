import z from 'zod';

import { ContainerClass } from '@/common/container/class';
import {
  PortfolioEntity,
  PortfolioSchema
} from '@/modules/portfolios/entities/portfolio.entity';

export const AddPortfolioSchema = z.object({
  name: z.string().min(3).max(200),
  currency_id: z.string(),
  user_id: z.string()
});

type AddPortfolioProps = z.infer<typeof AddPortfolioSchema>;

export class AddPortfolioService extends ContainerClass {
  public async execute({
    name,
    currency_id,
    user_id
  }: AddPortfolioProps): Promise<PortfolioEntity> {
    const newPortfolio = await this.db.portfolio.create({
      data: {
        name,
        currency_id,
        user_id
      },
      select: {
        id: true,
        name: true,
        currency: {
          select: {
            code: true,
            name: true
          }
        },
        status: true
      }
    });

    const portfolio = PortfolioSchema.parse(newPortfolio);

    const cacheKey = `user:${user_id}-portfolios`;
    const cachedPortfolios = await this.cache.get<PortfolioEntity[]>(cacheKey);

    await this.cache.set(
      cacheKey,
      JSON.stringify([...(cachedPortfolios ?? []), portfolio]),
      60 * 60 * 24
    );

    return portfolio;
  }
}
