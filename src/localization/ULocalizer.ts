import i18next from 'i18next';
import BrowserDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initLitI18n, translate } from 'lit-i18n';
import { initReactI18next, useTranslation } from 'react-i18next';

import type { Languages, Resources, ULocalizerConfig } from './ULocalizer.model';
import { languages } from './ULocalizer.model';
import { ko, en } from './locales';

/**
 * 언어 설정 및 리소스를 주입합니다.
 * @param config ULocalizer 설정
 */
export async function init(config?: ULocalizerConfig) {
  const debug = config?.debug || false;
  const basepath = config?.basepath?.replace(/^\/|\/$/g, '') || 'locales';
  const defaultNS = config?.defaultNS || 'translation';
  const resources = config?.resources;

  // i18next 초기화
  await i18next
    .use(HttpBackend)
    .use(BrowserDetector)
    .use(initLitI18n)
    .use(initReactI18next)
    .init({
      debug: debug,
      load: 'languageOnly',
      backend: {
        loadPath: `/${basepath}/{{lng}}/{{ns}}.json`,
      },
      detection: { order: ['navigator'] },
      supportedLngs: languages,
      fallbackLng: 'en',
      defaultNS: defaultNS,
      ns: [ defaultNS ],
      nsSeparator: '::',
      interpolation: {
        escapeValue: false,
      }
    });

  // 기본 컴포넌트 리소스 추가
  addResources({ en, ko });
  // 추가 리소스가 있을 경우 추가
  resources && addResources(resources);
}

/**
 * 리소스를 직접 추가합니다.
 * @param resources 추가할 리소스
 */
export function addResources(resources: Resources) {
  for (const lang of languages) {
    for (const ns in resources[lang]) {
      i18next.addResources(lang, ns, resources[lang][ns]);
    }
  }
}

/**
 * 현재 설정된 언어를 반환합니다.
 * @returns Languages
 */
export function getLocale(): Languages {
  const i18lang = i18next.language;
  return (
    i18lang.includes('ko') 
    ? 'ko' 
    : 'en'
  );
}

/**
 * 언어를 설정합니다.
 * @param locale 설정할 언어
 */
export function setLocale(locale: Languages) {
  return i18next.changeLanguage(locale);
}

/**
 * Lit Element에 사용할 수 있는 번역 함수입니다.
 * @param key 번역할 키
 * @example
 * ```ts
 * import { t } from './ULocalizer';
 * 
 * html`<div>${t('hello')}</div>`
 * html`<div>${t('namespace::bye')}</div>`
 */
export function t(key: string) {
  return translate(key);
}

/**
 * React에서 사용할 수 있는 번역 함수입니다.
 * @example
 * ```ts
 * import { useT } from './ULocalizer';
 * 
 * const { t } = useT();
 * return <div>{t('hello')}</div>
 * return <div>{t('namespace::bye')}</div>
 */
export function useT() {
  return useTranslation();
}

export const ULocalizer = {
  init,
  addResources,
  getLocale,
  setLocale,
  t,
  useT,
};
