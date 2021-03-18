import { CarotteAmqp } from 'carotte-amqp';
import Provider, { IProviderApp } from './provider';
import { IConfig } from './app/config';

import Services from './services';
import { teapot } from '@hapi/boom';

export interface MailOptions {
  // provider_priority?: ProviderPriority;
  // notification_provider: string; // mail, facebook, etc.
  language?: string;
  from_service_name?: string;
  template_name?: string;
  mail_cc?: string | string[];
  mail_bcc?: string | string[];
  mail_recipients?: string | string[];
  mail_subject_prefix?: string;
  payload?: any;
}

export default (app: IProviderApp): void => {
  const subscribe = (queueName: string) =>
    app.rabbit.subscribe(
      `${app.config.env}.nagory.mailer.${queueName}`,
      async ({ data }: CarotteAmqp.HandlerParams) => {
        try {
          const options: MailOptions = data;

          // ---
          if (!options.mail_recipients) {
            throw new Error('mail_recipients_is_required');
          }

          // ---
          const { subject, html } = await Services.template.process(
            queueName === '*' ? options.template_name || '' : queueName,
            {
              language: options.language || 'FR-fr',
              payload: data.payload
            }
          );

          // ---
          const config: IConfig = Provider.get<IConfig>('config');
          await Services.smtp.send({
            sender: config.mailer.sender,
            recipients: options.mail_recipients,
            bcc: options.mail_bcc,
            cc: options.mail_cc,
            subject: (options.mail_subject_prefix || '') + subject,
            html: html
          });
        } catch (e) {
          console.log(e);
          // SEND AGAIN ?
          throw new Error('internal_notification_error');
        }
      }
    );

  // Actions
  subscribe('*');
  subscribe('reset-password');
  subscribe('confirm-account');
  subscribe('confirm-member');
};
