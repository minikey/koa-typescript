import * as Koa from 'koa';
import * as Router from 'koa-better-router';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as path from 'path';
import { render } from './template';
import { mmSession } from './session';
import { authFilter } from './filter';
import { json } from './json';
import { db } from './db';
import { Context } from 'vm';
import { loader } from './loader';

const app: Koa = new Koa();
const router: Router = new Router().loadMethods();
const port: number = 8888; // 服务监听端口

app.use(mmSession(app));
app.context.db = db();
app.context.router = router;

loader(app).then(() => {
  app
    .use(bodyParser())
    .use(serve('../www'))
    .use(authFilter)
    .use(json)
    .use(
      render('../views', {
        ext: '.njk'
      })
    )
    .use(router.middleware());

  app.on('error', (err) => {
    console.error(err);
  });

  app.listen(port);

  console.log(`<--- server is runing @${port} --->`);
});
