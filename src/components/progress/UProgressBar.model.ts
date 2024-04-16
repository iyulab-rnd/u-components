export interface UProgressBarModel {

  /**
   * 현재 진행률 값을 나타냅니다.
   * 0 ~ 100 사이의 값을 가집니다.
   */
  value?: number;

  /**
   * 무한 진행으로 설정합니다.
   * @default false
   */
  Infinite?: boolean;

  /**
   * 바의 두께를 설정합니다.
   * @default 4px
   */
  thickness?: string;

}