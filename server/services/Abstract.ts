import { IMetaRequest } from '../backend-lib';
import { Services } from './';

export abstract class AServices {
  constructor(public services: Services, public meta?: IMetaRequest) {}
}
