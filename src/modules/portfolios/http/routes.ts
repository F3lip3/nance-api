import { FastifyInstance } from 'fastify';

import { AddPortfolioSchema } from '@/modules/portfolios/services/add-portfolio.service';

const addPortfolioSchema = AddPortfolioSchema.omit({ user_id: true });

export async function portfoliosRouter(app: FastifyInstance) {
  app.get('/portfolios', async req => {
    const { getPortfoliosService } = req.diScope.cradle;
    const portfolios = await getPortfoliosService.execute({
      user_id: req.userId
    });

    return portfolios;
  });

  app.post('/portfolios', async req => {
    const { name, currency_id } = addPortfolioSchema.parse(req.body);

    const { addPortfolioService } = req.diScope.cradle;
    const newPortfolio = await addPortfolioService.execute({
      name,
      currency_id,
      user_id: req.userId
    });

    return newPortfolio;
  });
}
