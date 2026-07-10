import { Router } from "express";

export class RouterCreator {
  #options;
  #defaultMiddlewares;
  #router;

  constructor({ options = [], defaultMiddlewares = [] } = {}) {
    this.#options = options;
    this.#defaultMiddlewares = defaultMiddlewares;
    this.#router = Router();
  }

  get router() {
    return this.#router;
  }

  setRouter() {
    for (const option of this.#options) {
      const { route, method, controller, middlewares = [] } = option;
      const handlers = [...this.#defaultMiddlewares, ...middlewares, controller];
      this.#router[method](route, ...handlers);
    }
  }
}

export function createRouter(params) {
  return new RouterCreator(params);
}
