import fastify from 'fastify';

import { fastifyAwilixPlugin } from '@fastify/awilix';

import '@/common/container';
import { router } from '@/http/router';

const app = fastify({ logger: true });

app.register(fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true
});

app.register(router);

app.listen({ port: 3333 }).then(() => {
  console.info('HTTP server running!');
});
