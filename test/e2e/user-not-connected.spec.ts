import supertest from 'supertest';

import initialization from './_config/setup';
import { apisRoutes } from './_config/apis-routes';
import { BASE_API } from './_config/config';

// ---
let app: any = null;
beforeAll(async (done) => {
  try {
    app = await initialization();
  } catch (e) {
    console.error(e);
  }
  done();
});

// ---
Object.values(apisRoutes).forEach((controller: any) =>
  describe(`[API] - ${controller.name}: {${controller.prefix}}`, () =>
    Object.values(controller.routes).forEach((route: any) =>
      it(`[${route.method} - ${controller.prefix}${route.route}] - I'm asking the route but I'm not connected`, async () => {
        const result = await supertest(app.server)
          [route.method](`${BASE_API}${controller.prefix}${route.route}`)
          .set('Accept', 'application/json')
          .expect(route.statusExpected)
          .expect('Content-Type', /json/);
        expect(result.body).toStrictEqual(route.bodyExpected);
      })
    ))
);

// ---
afterAll(() => {
  app && app.server.close();
  app && app.connection.close();
});
