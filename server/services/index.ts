import { IMetaRequest } from '../backend-lib';

import TemplateService from './template.service';
import SmtpService from './smtp.service';

export class Services {
  public template: TemplateService;
  public smtp: SmtpService;

  constructor(meta?: IMetaRequest) {
    this.template = new TemplateService(this, meta);
    this.smtp = new SmtpService(this, meta);
  }

  public setMeta(meta?: IMetaRequest): Services {
    return new Services(meta);
  }
}

export default new Services();
