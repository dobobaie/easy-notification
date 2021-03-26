import * as Boom from '@hapi/boom';
import Errors from '../../../server/app/errors';

const packageJSON: any = require('../../../package.json');

// ---
export const buildErrorCode = (errorCode: string) => ({
  errors: [
    {
      code: errorCode
    }
  ]
});

// ---
export const getStatusCode = (status: string) =>
  (Boom as any)[status]().output.statusCode;

// ---
export const getStatusCodeFromErrorCode = (errorCode: string) =>
  getStatusCode((Errors as any)[errorCode] || 'badImplementation');

// ---
export const apisRoutes = {
  index: {
    name: 'IndexController',
    prefix: '',
    routes: {
      get_: {
        route: '/',
        method: 'get',
        statusExpected: 200,
        bodyExpected: {
          message: `Welcome to ${packageJSON.name} ${packageJSON.version}`
        }
      },
      get_health: {
        route: '/health',
        method: 'get',
        statusExpected: 200,
        bodyExpected: {
          status: 'OK'
        }
      }
    }
  }
};
