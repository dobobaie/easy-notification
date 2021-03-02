import 'reflect-metadata';

import Lib from './backend-lib';

import Config, { IConfig } from './app/config';
import StaticProvider, { IProviderApp, IProviderModules } from './provider';

import Rabbit from './rabbitmq';

/*** Secure ***/
let logger: any = console;
const perror = (_: string, error: Error) => {
  console.error(error.stack);
  logger.error(error.stack);
  process.kill(process.pid, 'SIGUSR2');
  process.exit(1);
};
(process as NodeJS.EventEmitter).on('uncaughtException', (error: Error) =>
  perror('uncaughtException', error)
);
(process as NodeJS.EventEmitter).on('unhandledRejection', (error: Error) =>
  perror('unhandledRejection', error)
);

/*** Instances ***/
const config: IConfig = Config(process.env);
const rabbit: any = Lib.modules.rabbitmq(config);
const pTypeorm: Promise<any> = Lib.modules.typeorm(config);
logger = Lib.modules.winston(config);

/*** Initialize app ***/
export default Promise.all([pTypeorm]).then(([]) => {
  /*** App ***/
  const app: IProviderApp = {
    config,
    rabbit,
    logger
  };

  /*** Modules ***/
  const modules: IProviderModules = {
    rabbit: Rabbit(app)
  };

  /*** Provider ***/
  StaticProvider.set({ app, modules });

  // ---
  logger.info(`Server started on RabbitMq`);
});
