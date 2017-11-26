import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import * as Koa from 'koa';

const svcPath = 'service/**/*_svc.js';
const cwd = process.cwd();

function thenGlob(path: string, options: any = {
  cwd
}) {
  return new Promise((resolve, reject) => {
    glob(path, options, function(err: Error, files: Array<string>) {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  }).catch(err => {console.error(err)});
}

/**
 * 
 * @param app 动态加载服务
 */
export function svcLoader(app: Koa) {
  let svcs = {};
  let reg = /\/(.+).js$/
  return thenGlob(svcPath).then((files: Array<string>) => {
    files.forEach(file => {
      let name = file.match(reg)[1];
      svcs[name] = require(path.resolve(cwd, file));
    });
  }).then(() => {
    app.context.svcs = svcs;
  });
}