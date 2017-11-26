import { Context } from 'koa';

export async function json(ctx: Context, next: Function) {
  ctx.json = function(data) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = JSON.stringify(data);
  };
  return next();
}
