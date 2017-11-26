import * as Koa from 'koa';

declare module 'koa' {
  interface BaseContext {
    /**
     * 模版渲染
     */
    render(view: string, context?: any): any;

    /**
     * 返回json数据
     */
    json(data: any): any;

    db: any;

    svcs: any;

    router: any;

    controllers: any;
  }
}
