import { FastifyInstance } from 'fastify';

export async function currenciesRouter(app: FastifyInstance) {
  app.get('/currencies', async (request, reply) => {
    const { getCurrenciesService } = request.diScope.cradle;
    const currencies = await getCurrenciesService.execute();

    return reply.send(currencies);
  });
}
