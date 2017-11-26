import * as path from 'path';

function Controller<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    controllerName: string = constructor.name.replace(/^(.)(.+?)Controller$/, function($0, $1, $2) {
      return `${$1.toLowerCase()}${$2}`;
    });
    
    actions
  };
}

function Action(opt: { path: string; method: string }): Function {
  return function(target, methodName) {
    target['actions'] = []; // 存储每个类里面的action
    target.actions.push(Object.assign({}, opt, {
      action: target[methodName],
    }));
  };
}

export { Controller, Action };
