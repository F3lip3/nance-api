import { ICacheProvider } from '@/common/container/providers/cache/model/cache.interface';
import { Currency } from '@/modules/currencies/entities/currency.entity';
import { PrismaClient } from '@prisma/client/extension';

type ServiceProps = {
  cache: ICacheProvider;
  db: PrismaClient;
};

export class GetCurrenciesService {
  cache: ICacheProvider;
  db: PrismaClient;

  constructor({ cache, db }: ServiceProps) {
    this.cache = cache;
    this.db = db;
  }

  public async execute() {
    const cachedCurrencies = await this.cache.get<Currency[]>('currencies');
    if (cachedCurrencies !== undefined) {
      return cachedCurrencies;
    }

    const currencies = await this.db.currency.findMany({
      select: {
        id: true,
        code: true,
        name: true
      }
    });

    await this.cache.set('currencies', currencies, 60 * 60 * 24);

    return currencies;
  }
}
