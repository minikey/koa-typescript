import {Context} from 'koa';
import User from '../entity/user';

async function uploadAction(ctx: Context) {
  let user: User = new User();
  user.firstName = 'fu';
  user.lastName = 'min';
  try {
    let con = await ctx.db;
    let man = await con.manager.save(user);
  } catch (error) {
    console.error(error);
  }
  
  return ctx.render('index/upload');
}

async function loginAction(ctx: Context) {
  
}

export {
  uploadAction
};