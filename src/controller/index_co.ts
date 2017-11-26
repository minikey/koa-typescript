import { Context } from 'koa';
import User from '../entity/user';
import BaseController from './base';
import {Controller, Action} from '../core/controller';

@Controller
export default class IndexController extends BaseController {

  @Action({
    path: '/upload',
    method: 'get'
  })
  async uploadAction(ctx: Context) {
    return ctx.render('index/upload');
  }

  async loginAction(ctx: Context) {}
}
