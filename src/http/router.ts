import { FastifyInstance } from 'fastify';

import { getCurrencies } from '@/modules/currencies/http/routes';

export async function router(app: FastifyInstance) {
  app.register(getCurrencies);
}
