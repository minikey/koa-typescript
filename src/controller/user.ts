import {Context} from 'koa';

export async function save(ctx: Context) {
  return ctx.render('index/upload');
}