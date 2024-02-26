import { asClass, asValue } from 'awilix';

import { prisma } from '@/lib/prisma';
import { diContainer } from '@fastify/awilix';
import { PrismaClient } from '@prisma/client';

import { RedisProvider } from '@/common/container/providers/cache/implementations/redis.provider';
import { ICacheProvider } from '@/common/container/providers/cache/model/cache.interface';

import { GetCurrenciesService } from '@/modules/currencies/services/get-currencies.service';
import { AddPortfolioService } from '@/modules/portfolios/services/add-portfolio.service';
import { GetPortfoliosService } from '@/modules/portfolios/services/get-portfolios.service';

declare module '@fastify/awilix' {
  interface Cradle {
    db: PrismaClient;
    cache: ICacheProvider;
    addPortfolioService: AddPortfolioService;
    getCurrenciesService: GetCurrenciesService;
    getPortfoliosService: GetPortfoliosService;
  }
}

export const startContainer = () => {
  return diContainer.register({
    db: asValue(prisma),
    cache: asClass(RedisProvider).singleton(),
    addPortfolioService: asClass(AddPortfolioService).singleton(),
    getCurrenciesService: asClass(GetCurrenciesService).singleton(),
    getPortfoliosService: asClass(GetPortfoliosService).singleton()
  });
};
