import fs from 'fs';
import mjml2html from 'mjml';
import Mustache from 'mustache';

import Provider from '../provider';
import { IConfig } from '../app/config';

import { AServices } from './Abstract';

export interface ConfigTemplate {
  subject: string;
  template_url: string;
}

export interface ITemplate {
  subject: string;
  html: string;
}

export default class TemplateService extends AServices {
  public process(templateName: string, metadata: any): ITemplate {
    const config: IConfig = Provider.get<IConfig>('config');
    const { language } = metadata;

    // ---
    const tplDir: string = config.mailer.template.path + '/' + templateName;
    if (templateName === '' || !fs.existsSync(tplDir)) {
      throw new Error('template_not_found');
    }

    // ---
    const tplConfigRaw: string = fs
      .readFileSync(tplDir + '/config.json')
      .toString();
    const tplConfig: ConfigTemplate = JSON.parse(tplConfigRaw);

    // ---
    const tplLangRaw: string = fs
      .readFileSync(tplDir + '/i18n/' + language + '.json')
      .toString();
    const tplLang: any = JSON.parse(tplLangRaw);

    // ---
    const tplMjml: string = fs
      .readFileSync(tplDir + '/' + tplConfig.template_url)
      .toString();
    const renderer: string = Mustache.render(tplMjml, {
      _: {
        ...tplLang
      }
    });
    const { html }: any = mjml2html(renderer);

    return {
      subject: tplLang[tplConfig.subject],
      html
    };
  }
}
