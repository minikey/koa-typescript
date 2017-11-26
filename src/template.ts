import * as nunjucks from 'nunjucks';
import { Context } from 'koa';

export function render (path: string, opts) {
  let env = nunjucks.configure(path, opts);

  const ext = opts.ext || '';

  const filters = opts.filters || {};
  Object.keys(filters).forEach((f) => {
    env.addFilter(f, filters[f]);
  });

  const globals = opts.globals || {};
  Object.keys(globals).forEach((g) => {
    env.addGlobal(g, globals[g]);
  });

  const extensions = opts.extensions || {};
  Object.keys(extensions).forEach((e) => {
    env.addExtension(e, extensions[e]);
  });

  return async (ctx: Context, next) => {
    ctx.render = (view: string, context?: any) => {
      return new Promise((resolve, reject) => {
        nunjucks.render(view + ext, context, (err, body) => {
          if (err) return reject(err);
          ctx.set('Content-Type', 'text/html; charset=utf-8');
          ctx.body = body;
          resolve();
        });
      }).catch((err) => {
        console.log(err);
      });
    };
    return next();
  };
}
