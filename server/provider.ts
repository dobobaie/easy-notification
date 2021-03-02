import { CarotteAmqp } from 'carotte-amqp';
import { Logger } from 'winston';

import { IConfig } from './app/config';

export interface IProviderApp {
  config: IConfig;
  rabbit: CarotteAmqp.LibInstance;
  logger: Logger;
}

export interface IProviderModules {}

export interface IProvider {
  app: IProviderApp;
  modules: IProviderModules;
}

let provider: IProvider;
export default class StaticProvider {
  public static set(data: IProvider): void {
    provider = Object.assign({}, data);
  }

  public static getApp<U extends keyof IProviderApp>(key: U) {
    return provider.app[key];
  }

  public static getModule<U extends keyof IProviderModules>(key: U) {
    return provider.modules[key];
  }

  public static get<T>(key?: string): T {
    return <T>(
      (<any>(
        (key
          ? this.getApp(<keyof IProviderApp>key) ||
            this.getModule(<keyof IProviderModules>key)
          : provider)
      ))
    );
  }
}
