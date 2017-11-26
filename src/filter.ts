import { Context } from 'koa';

const whiteList: Array<string> = [ '127.0.0.1' ];

/**
 * 权限检测过滤器
 * 
 * @param {Context} ctx 
 * @param {Function} next 
 */
async function authFilter(ctx: Context, next: Function) {
  let ip: string = (ctx.request.ip || '').split(':').slice(-1)[0] || '';

  if (whiteList.indexOf(ip) === -1) {
    let info = ctx.session.user; // 获取用户信息

    if (!info) {
      ctx.status = 405;
      ctx.body = 'err';
      return;
    }
  }

  return next();
}

export { authFilter };
