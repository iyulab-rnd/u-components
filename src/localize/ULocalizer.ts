import { configureLocalization, LOCALE_STATUS_EVENT } from '@lit/localize';
import { sourceLocale, targetLocales } from './ULocaleCodes';

export class ULocalizer {

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