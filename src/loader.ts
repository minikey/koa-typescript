import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import * as Koa from 'koa';

const svcPath = 'service/*_svc.js';
const controllerPath = 'controller/*_co.js';
const cwd = process.cwd();

/**
 * 加载指定的文件
 * @param path 
 * @param options 
 */
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
      let name: string = file.match(reg)[1];
      svcs[name] = require(path.resolve(cwd, file));
    });
  }).then(() => {
    app.context.svcs = svcs;
  });
}

/**
 * 
 * @param app 动态加载Controller
 */
export function conLoader(app: Koa) {
  let controllers = {};
  return thenGlob(controllerPath).then((files: Array<string>) => {
    files.forEach((file) => {
      let Base = require(path.resolve(cwd, file)).default;
      let instance = new Base();
      controllers[instance.controllerName] = instance;
    });
  }).then(() => {
    Object.keys(controllers).forEach((key) => {
      let controller = controllers[key];
      controller['actions'].forEach((action) => {
        let router = app.context.router;
        router[action.method].call(router, path.join(`/${controller.controllerName}`, action.path), action.action);
        
        // 如果是首页，可以不用输入 /index/
        if ('index' === controller.controllerName) {
          router[action.method].call(router, action.path, action.action);
        }
      });
    });;
    app.context.controllers = controllers;
  });
}

export function loader(app: Koa) {
  return Promise.all([svcLoader(app), conLoader(app)]);
}