import { asClass, asValue } from 'awilix';

import { diContainer } from '@fastify/awilix';

import { RedisProvider } from '@/common/container/providers/cache/implementations/redis.provider';
import { ICacheProvider } from '@/common/container/providers/cache/model/cache.interface';
import { prisma } from '@/lib/prisma';
import { GetCurrenciesService } from '@/modules/currencies/services/get-currencies.service';
import { PrismaClient } from '@prisma/client/extension';

declare module '@fastify/awilix' {
  interface Cradle {
    db: PrismaClient;
    cache: ICacheProvider;
    getCurrenciesService: GetCurrenciesService;
  }
}

export const startContainer = () => {
  return diContainer.register({
    db: asValue(prisma),
    cache: asClass(RedisProvider).singleton(),
    getCurrenciesService: asClass(GetCurrenciesService).singleton()
  });
};
