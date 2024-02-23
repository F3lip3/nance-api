import { FastifyPluginCallback } from 'fastify';

import { getCurrencies } from '@/modules/currencies/http/routes';
import { clerkClient, clerkPlugin, getAuth } from '@clerk/fastify';

export const protectedRoutes: FastifyPluginCallback = (
  instance,
  opts,
  done
) => {
  instance.register(clerkPlugin);

  instance.get('/me', async (request, reply) => {
    const { userId } = getAuth(request);
    if (!userId) {
      return reply.code(403).send();
    }

    const user = await clerkClient.users.getUser(userId);
    return { user };
  });

  done();
};

export const publicRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.register(getCurrencies);
  done();
};
