export interface UProgressRingModel {

  /**
   * 현재 진행률 값을 나타냅니다.
   * 0 ~ 100 사이의 값을 가집니다.
   */
  value?: number;

  /**
   * 링의 사이즈를 설정합니다.
   * @default 48px
   */
  size?: string;

  /**
   * 링의 두께를 설정합니다.
   * @default 4px
   */
  thickness?: string;

}