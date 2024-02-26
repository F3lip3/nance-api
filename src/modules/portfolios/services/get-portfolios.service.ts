import z from 'zod';

import { ContainerClass } from '@/common/container/class';
import {
  PortfolioEntity,
  PortfolioSchema
} from '@/modules/portfolios/entities/portfolio.entity';

export const GetPortfoliosSchema = z.object({
  user_id: z.string()
});

type GetPortfoliosProps = z.infer<typeof GetPortfoliosSchema>;

export class GetPortfoliosService extends ContainerClass {
  public async execute({
    user_id
  }: GetPortfoliosProps): Promise<PortfolioEntity[]> {
    const cacheKey = `user:${user_id}-portfolios`;
    const cachedPortfolios = await this.cache.get<PortfolioEntity[]>(cacheKey);

    if (cachedPortfolios) {
      return cachedPortfolios;
    }

    const rawPortfolios = await this.db.portfolio.findMany({
      where: { user_id, status: 'ACTIVE' },
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

    const portfoliosSchema = z.array(PortfolioSchema);
    const portfolios = portfoliosSchema.parse(rawPortfolios);

    await this.cache.set(cacheKey, JSON.stringify(portfolios), 60 * 60 * 24);

    return portfolios;
  }
}
