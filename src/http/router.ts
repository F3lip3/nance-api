import { FastifyPluginCallback } from 'fastify';

import { currenciesRouter } from '@/modules/currencies/http/routes';
import { clerkClient, clerkPlugin, getAuth } from '@clerk/fastify';

const protectedRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.register(clerkPlugin);
  instance.decorateRequest('userId', '');
  instance.addHook('preHandler', (req, reply, done) => {
    const { userId } = getAuth(req);
    if (!userId) {
      return reply.code(403).send();
    }

    req.userId = userId;

    done();
  });

  instance.get('/me', async req => {
    const user = await clerkClient.users.getUser(req.userId);
    return { user };
  });

  done();
};

const publicRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.register(currenciesRouter);

  done();
};

export const router: FastifyPluginCallback = (instance, opts, done) => {
  instance.register(protectedRoutes, { prefix: '/api' });
  instance.register(publicRoutes, { prefix: '/api' });

  done();
};
