export default class Base {
  db: any;

  constructor(db: any) {
    this.db = db;
  }

  async getManager() {
    let con = await this.db;
    return con.manager;
  }
}