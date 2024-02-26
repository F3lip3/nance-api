import { ContainerClass } from '@/common/container/class';
import { Currency } from '@/modules/currencies/entities/currency.entity';

export class GetCurrenciesService extends ContainerClass {
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

    await this.cache.set('currencies', currencies, 60 * 60 * 24 * 30);

    return currencies;
  }
}
