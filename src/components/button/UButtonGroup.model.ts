export type GroupOrientation = 'vertical' | 'horizontal';

export type GroupPosition = 'start' | 'center' | 'end';

/**
 * UButtonGroupModel 인터페이스는 버튼 그룹의 모델을 정의합니다.
 */
export interface UButtonGroupModel {
  /**
   * 그룹의 방향을 나타내는 열거형 값입니다.
   */
  orientation: GroupOrientation;
  /**
   * 그룹의 위치를 나타내는 열거형 값입니다.
   */
  position: GroupPosition;
  /**
   * 버튼 사이의 간격을 나타내는 문자열입니다.
   */
  gap: string;
}