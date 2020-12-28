import { PlatformTest } from '@tsed/common';
import SuperTest from 'supertest';
import { LambdaServer } from './LambdaServer';

describe('LambdaServer', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(LambdaServer));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it('should call GET /rest', async () => {
    const response = await request.get('/rest').expect(404);

    expect(response.body).toEqual({
      errors: [],
      message: 'Resource "/rest" not found',
      name: 'NOT_FOUND',
      status: 404,
    });
  });
});
