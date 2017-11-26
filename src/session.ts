import * as session from 'koa-session';
import * as MemoryStore from 'koa-session-memory';
import * as Koa from 'koa';

const store = {};

const sessionConfig = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  store: new MemoryStore()
};

function mmSession(app: Koa) {
  app.keys = [ 'wdfe-cdn' ];
  return session(sessionConfig, app);
}

export { mmSession };
