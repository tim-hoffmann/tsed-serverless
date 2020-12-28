import { Configuration } from '@tsed/di';
import { Server } from './Server';

@Configuration({
  ...Server,
  mount: {},
})
export class LambdaServer {}
