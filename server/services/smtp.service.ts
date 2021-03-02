import Lib from '../backend-lib';
import Provider from '../provider';
import { IConfig } from '../app/config';

import { AServices } from './Abstract';

export interface TransporterOptions {
  sender?: string;
  cc?: string | string[];
  bcc?: string | string[];
  recipients?: string | string[];
  subject?: string;
  html?: string;
}

export default class SmtpService extends AServices {
  public send(options: TransporterOptions) {
    return new Promise((resolve, reject) => {
      const config: IConfig = Provider.get<IConfig>('config');
      const transporter: any = Lib.modules.mailer({
        type: 'MAILJET',
        meta: config.mailer.mailjet
      });
      transporter.sendMail(
        {
          from: options.sender,
          to: options.recipients,
          bcc: options.bcc,
          cc: options.cc,
          subject: options.subject,
          html: options.html
        },
        (err: any, result: any) => (err ? reject(err) : resolve(result))
      );
    });
  }
}
