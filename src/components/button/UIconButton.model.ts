import type { UIconType } from "../icon/UIcon.model";
import type { UTooltipPosition } from "../tooltip/UTooltip.model";
import type { CommandModel } from "../../patterns/CommandPattern";
import type { UButtonTarget } from "./UButton.model";

/**
 * UIconButtonModel은 UIconButton 컴포넌트의 모델을 정의하는 인터페이스입니다.
 */
export interface UIconButtonModel {
  
  /**
   * 아이콘의 렌더링방식을 지정합니다. u-icon 컴포넌트의 type 속성값과 동일합니다.
   * @default 'default'
   */
  type?: UIconType;

  /**
   * 렌더링할 아이콘의 이름입니다. u-icon 컴포넌트의 name 속성값과 동일합니다.
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

  /**
   * 클릭 시 이동할 링크의 URL입니다.
   */
  href?: string;

  /**
   * 링크를 열 때 사용할 타겟입니다.
   */
  target?: UButtonTarget;

  /**
   * 다운로드할 파일의 이름입니다.
   */
  download?: string;

  /**
   * 버튼이 비활성화되었는지 여부를 나타냅니다.
   */
  disabled: boolean;

  /**
   * 버튼이 로딩 중인지 여부를 나타냅니다.
   */
  loading: boolean;

  /**
   * 버튼에 툴팁을 표시할 문자열입니다.
   */
  tooltip?: string;

  /**
   * 툴팁의 위치를 지정하는 열거형 값입니다.
   */
  tooltipPosition: UTooltipPosition;

  /**
   * 버튼이 실행할 커맨드 모델입니다.
   */
  command?: CommandModel;

  /**
   * 커맨드에 전달될 파라미터입니다.
   */
  commandParam?: any;
  
}