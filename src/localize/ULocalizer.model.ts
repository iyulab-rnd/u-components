import type { LocaleModule } from "@lit/localize";

export type LocaleStatus = 'loading' | 'ready' | 'error';

/**
 * ULocalizer의 설정을 나타내는 인터페이스
 */
export interface ULocalizerConfig {
  /**
   * 로컬라이징을 위한 기본 언어
   */
  sourceLocale: string;
  
  /**
   * 로컬라이징을 위한 대상 언어들
   */
  targetLocales: Iterable<string>;
  
  /**
   * 언어를 로드하는 함수
   * @param locale - 로드할 언어
   * @returns 로드된 언어 모듈
   * @example 동적 로딩 사용을 권장
   * ```ts
   * loadLocale: async (locale: string) => {
   *   return await import(`./locales/${locale}.ts`);
   * }
   * ```
   */
  loadLocale: (locale: string) => Promise<LocaleModule>;
}
