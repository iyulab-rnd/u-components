import { configureLocalization, LOCALE_STATUS_EVENT } from '@lit/localize';
import { sourceLocale, targetLocales } from './ULocaleCodes';

export class ULocalizer {
  private static locale?: string;

  public static getLocale() {
    if (this.locale) {
      return this.locale;
    } else {
      const clientLang = window.navigator.language;
      console.log(`Client language: ${clientLang}`);
      // if(targetLocales.includes(clientLang)) {
      //   return clientLang;
      // } else {
      //   return sourceLocale;
      // }
    }
  }

  public static configureLocalization() {
    configureLocalization({
      sourceLocale: sourceLocale,
      targetLocales: targetLocales,
      loadLocale: async (locale) => await import(`./locales/${locale}.ts`),
    });
  }

  public static registerEvent() {
    window.addEventListener(LOCALE_STATUS_EVENT, (e: CustomEvent) => {
      console.log(`Locale status: ${e}`);
    });
  }

}