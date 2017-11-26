import {getManager} from 'typeorm';
import {db} from '../db';
import User from '../entity/user';
import Base from './base';

export default class UserService extends Base {

  /**
   * 根据id获取User
   * @param id 
   */
  async getByPk(id: string) {
    let man = getManager();
    let user = await man.findOneById(User, id);
    return user;
  }

  /**
   * 保存
   * @param user 
   */
  async save(user:User) {
    let man = getManager();
    let info = await man.save(user);
    return info;
  }
}