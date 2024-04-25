import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initLitI18n, translate } from 'lit-i18n';
import { initReactI18next, useTranslation } from 'react-i18next';

export type Languages = typeof languages[number];

export interface ULocalizerConfig {
  en: Record<string, string>;
  ko: Record<string, string>;
}

export const languages = ['en', 'ko'] as const;

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

export function setup(config: ULocalizerConfig) {
  i18next
    .use(detector)
    .use(initLitI18n)
    .use(initReactI18next)
    .init({
      debug: import.meta.env.MODE === 'development' || false,
      supportedLngs: languages,
      fallbackLng: 'en',
      detection: { order: ['navigator'] },
      resources: {
        en: {
          translation: {
            ...config.en
          }
        },
        ko: {
          translation: {
            ...config.ko
          }
        }
      }
    });
}

const ULocalizer = {
  getLocale,
  setLocale,
  t,
  useT,
  setup
};

export default ULocalizer;