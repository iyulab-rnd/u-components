/**
 * UIconModel 객체를 나타냅니다.
 */
export interface UIconModel {
  
  /**
   * Shoelace에서 사용되는 아이콘의 이름입니다.
   * @link https://shoelace.style/components/icon
   */
  name?: string;
  
  /**
   * 아이콘 소스의 URL주소입니다.
   * @default undefined
   */
  src?: string;

  /**
   * 아이콘의 색상입니다. CSS 색상 값으로 지정합니다.
   * @default undefined
   */
  color?: string;
  
  /**
   * 아이콘의 크기입니다. CSS 크기 값으로 지정합니다.
   * @default undefined
   */
  size?: string;

}