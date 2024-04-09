/**
 * UDividerModel 인터페이스는 구분선 모델을 나타냅니다.
 */
export interface UDividerModel {
  /**
   * 색상을 지정합니다.
   */
  color?: string;
  
  /**
   * 구분선의 굵기를 지정합니다.
   */
  width?: string;

  /**
   * 구분선의 마진을 지정합니다.
   */
  space?: string;

  /**
   * 구분선의 방향을 수직으로 지정합니다.
   */
  vertical: boolean;
}