export type UIconType = 'default' | 'system' | string;

/**
 * UIconModel 객체를 나타냅니다.
 */
export interface UIconModel {
  
  /**
   * 아이콘의 렌더링방식을 지정합니다.
   * - default: 파일로부터 렌더링합니다.
   * - system: 미리 정의된 벡터 데이터로부터 렌더링합니다.
   * - otherwise any string: 사용자 정의 렌더링 방식을 사용합니다.
   * 
   * @default 'default'
   */
  type?: UIconType;

  /**
   * 렌더링할 아이콘의 이름입니다.
   * - default: icons/{name}.svg
   * - system: SystemIcon 객체의 키값
   */
  name?: string;

  /**
   * 아이콘의 색상입니다. CSS 색상 값으로 지정합니다.
   * @default currentColor
   */
  color?: string;
  
  /**
   * 아이콘의 크기입니다. CSS 폰트사이즈 값으로 지정합니다.
   * @default 16px
   */
  size?: string;

}