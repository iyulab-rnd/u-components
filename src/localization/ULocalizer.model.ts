export const languages = ['en', 'ko'] as const;

export type Languages = typeof languages[number];

export type Resources = {
  [lang in Languages]: { 
    [namespace: string]: Record<string, string>; 
  };
}

/**
 * ULocalizer의 설정 옵션입니다.
 */
export interface ULocalizerConfig {
  /**
   * 파일 시스템을 이용한 리소스의 기본 경로입니다.
   * - 파일경로는 /${basepath}/${lng}/${ns}.json 형식으로 구성됩니다.
   * - ex) /locales/en/translation.json
   * @default 'locales'
   */
  basepath?: string;
  
  /**
   * 디버그 모드를 활성화 또는 비활성화합니다.
   * @default false
   */
  debug?: boolean;
  
  /**
   * 로컬라이제이션 키의 기본 네임스페이스입니다.
   * @default 'translation'
   */
  defaultNS?: string;
  
  /**
   * 파일시스템을 사용하지 않고, 로컬라이제이션을 구성 하기위한 추가 리소스입니다.
   * - 파일 시스템을 이용한 리소스는 basepath를 통해 설정됩니다.
   * - 기본 리소스는 ko, en이 포함됩니다.
   */
  resources?: Resources;
}
