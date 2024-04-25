import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initLitI18n, translate } from 'lit-i18n';
import { initReactI18next, useTranslation } from 'react-i18next';

import type { Languages, ULocalizerConfig } from './ULocalizer.model';
import { languages } from './ULocalizer.model';
import { en } from './locales/en';
import { ko } from './locales/ko';

export function init(config: ULocalizerConfig) {
  const namespaces = Object.keys(config.en);
  i18next
    .use(detector)
    .use(initLitI18n)
    .use(initReactI18next)
    .init({
      debug: import.meta.env.MODE === 'development' || false,
      supportedLngs: languages,
      fallbackLng: 'en',
      detection: { order: ['navigator'] },
      defaultNS: 'translate',
      ns: ['translate', 'component', ...namespaces],
      nsSeparator: '::',
      resources: {
        en: {
          ...en,
          ...config.en,
        },
        ko: {
          ...ko,
          ...config.ko,
        }
      }
    });
}

export function getLocale(): Languages {
  const i18lang = i18next.language;
  return (
    i18lang.includes('ko') 
    ? 'ko' 
    : 'en'
  );
}

export function setLocale(locale: Languages) {
  return i18next.changeLanguage(locale);
}

export function t(key: string) {
  return translate(key);
}

export function useT() {
  return useTranslation();
}

const ULocalizer = {
  init,
  getLocale,
  setLocale,
  t,
  useT,
};

export default ULocalizer;