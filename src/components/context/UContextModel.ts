/**
 * Represents the UContextModel interface.
 */
export interface UContextModel {
  /**
   * 컨텍스트 메뉴가 발동될 엘리먼트를 지정합니다.
   * @default parentElement
   */
  bounds: HTMLElement[];

  /**
   * 컨텍스트의 숨김/표시 상태를 나타냅니다.
   */
  open: boolean;

  /**
   * 클릭 이벤트가 발생하면 항상 컨텍스트 메뉴를 숨깁니다.
   */
  hideOnClick: boolean;

  /**
   * 현재 컨텍스트의 x좌표 위치를 나타냅니다.
   */
  posX?: number;

  /**
   * 현재 컨텍스트의 y좌표 위치를 나타냅니다.
   */
  posY?: number;

  /**
   * 컨텍스트 메뉴를 토글합니다.
   */
  toggle(): void;

  /**
   * 컨텍스트 메뉴를 표시합니다.
   */
  show(): void;

  /**
   * 컨텍스트 메뉴를 숨깁니다.
   */
  hide(): void;
}