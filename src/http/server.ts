import fastify from 'fastify';

import { startContainer } from '@/common/container';
import { router } from '@/http/router';
import { fastifyAwilixPlugin } from '@fastify/awilix';

const app = fastify({ logger: true });

app.register(fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true
});

startContainer();

app.register(router);

const start = async () => {
  try {
    await app.listen({ port: 3333 }).then(() => {
      console.info('HTTP server running!');
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
