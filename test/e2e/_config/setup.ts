import Config from '../../../server/app/config';
import Lib from '../../../server/backend-lib';
import Server from '../../../server/server';
import StaticProvider, {
  IProviderApp,
  IProviderModules
} from '../../../server/provider';

// ---
const DEFAULT_PORT = 5555;

const init = () =>
  new Promise(
    // eslint-disable-next-line no-async-promise-executor
    async (resolve: Function, reject: Function) => {
      try {
        // ---
        const config = Config(process.env);
        const app: IProviderApp = <any>{
          config: {
            ...config
          },
          logger: Lib.modules.winston(config)
        };

        // --
        const initConnection: any = await Lib.modules.typeorm({
          ...app.config,
          postgres: {
            ...app.config.postgres,
            db: ''
          },
          typeorm: {
            ...app.config.typeorm,
            synchronize: false
          }
        });
        await initConnection
          .query(`DROP DATABASE ${app.config.postgres.db}`)
          .catch(() => undefined);
        await initConnection.query(`CREATE DATABASE ${app.config.postgres.db}`);
        await initConnection.close();

        // ---
        const connection: any = await Lib.modules.typeorm(app.config);

        // --
        const modules: IProviderModules = <any>{
          server: Server(app)
        };
        StaticProvider.set({ app, modules });

        // ---
        const server = await new Promise((resolve: Function) => {
          const server = modules?.server?.listen(DEFAULT_PORT, () => {
            console.log(`Serveur test listening in port ${DEFAULT_PORT}`);
            resolve(server);
          });
        });

        // ---
        resolve({
          ...app,
          server,
          connection
        });
      } catch (e) {
        reject(e);
      }
    }
  );

export default init;
