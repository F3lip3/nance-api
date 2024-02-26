import { FastifyInstance } from 'fastify';

export async function currenciesRouter(app: FastifyInstance) {
  app.get('/currencies', async (request, reply) => {
    const service = request.diScope.resolve('getCurrenciesService');
    const currencies = await service.execute();

    return reply.send(currencies);
  });
}
