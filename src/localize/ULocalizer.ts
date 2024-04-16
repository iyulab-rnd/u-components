import { observable, IObservableValue } from 'mobx';
import { configureLocalization, LOCALE_STATUS_EVENT } from '@lit/localize';
import type { LocaleStatus, ULocalizerConfig } from './ULocalizer.model';

/**
 * 로컬라이징을 위한 모듈
 * @description lit/localize 라이브러리를 사용하여 로컬라이징을 구현
 * @see https://lit.dev/docs/localization/overview/
 */
export class ULocalizer {
  /**
   * 현재 언어변경 상태를 나타내는 observable value
   * - 'loading': 언어변경을 로딩 중인 상태
   * - 'ready': 언어변경 로딩이 완료된 상태
   * - 'error': 언어변경 로딩 중 오류가 발생한 상태
   */
  public static readonly status: IObservableValue<LocaleStatus> = observable.box('ready');

  /**
   * 현재 사용자의 언어를 반환하는 함수
   */
  public static getLocale: () => string;

  /**
   * 사용자의 언어를 변경하는 함수
   */
  public static setLocale: (locale: string) => Promise<void>;

  /**
   * ULocalizer를 설정하는 함수
   * @param config ULocalizer 설정
   */
  public static setup(config: ULocalizerConfig) {
    const { sourceLocale, targetLocales, loadLocale } = config;
    window.removeEventListener(LOCALE_STATUS_EVENT, this.handleStatusChange);
    window.addEventListener(LOCALE_STATUS_EVENT, this.handleStatusChange);
    const { getLocale, setLocale } = configureLocalization({
      sourceLocale: sourceLocale,
      targetLocales: targetLocales,
      loadLocale: loadLocale
    });
    this.getLocale = getLocale;
    this.setLocale = setLocale;
    this.setLocale(this.guessLocale());
  }

  // 언어 변경 시 상태를 업데이트하는 함수
  private static handleStatusChange = (event: CustomEvent) => {
    const status = event.detail.status;
    if (status === 'loading') {
      this.status.set('loading');
    } else if (status === 'ready') {
      this.status.set('ready');
    } else if (status === 'error') {
      this.status.set('error');
    }
  }

  // 브라우저 언어를 기반으로 사용자의 언어를 추측하는 함수
  private static guessLocale(): string {
    const clientLang = window.navigator.language.toLowerCase();
    if(clientLang.includes('ko')) {
      return 'ko';
    } else {
      return 'en';
    }
  }
  
}