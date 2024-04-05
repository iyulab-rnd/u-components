import type { CommandModel } from "../../patterns/CommandPattern";
import type { UTooltipPosition } from "../tooltip/UTooltip.model";

export type UButtonTheme = (
  'default' | 'primary' | 'success' | 
  'neutral' | 'warning' | 'danger' | 'text'
);

export type UButtonTarget = ('_blank' | '_self' | '_parent' | '_top');

export type UButtonSize = ('small' | 'medium' | 'large');

/**
 * UButtonModel은 UButton 컴포넌트의 모델 인터페이스입니다.
 */
export interface UButtonModel {

  /**
   * 버튼의 테마입니다.
   * @default 'default'
   */
  theme?: UButtonTheme;
  
  /**
   * 아웃라인 스타일 여부를 나타냅니다.
   * @default false
   */
  outline?: boolean;
  
  /**
   * 버튼의 크기입니다.
   * @default 'small'
   */
  size?: UButtonSize;

  /**
   * 링크로 사용될 경우의 URL입니다.
   */
  href?: string;

  /**
   * 링크로 사용될 경우의 타겟입니다.
   * @default '_self'
   */
  target?: UButtonTarget;

  /**
   * 다운로드 링크로 사용될 경우의 파일 이름입니다.
   */
  download?: string;

  /**
   * 버튼의 모양이 둥근지 여부를 나타냅니다.
   * @default false
   */
  round?: boolean;

  /**
   * 버튼이 비활성화 상태인지 여부를 나타냅니다.
   * @default false
   */
  disabled?: boolean;

  /**
   * 버튼을 로딩으로 표시할지 여부를 나타냅니다.
   * @default false
   */
  loading?: boolean;

  /**
   * 버튼에 캐럿(드롭다운시)이 표시될지 여부를 나타냅니다.
   * @default false
   */
  caret?: boolean;

  /**
   * 버튼에 툴팁이 표시될 경우의 내용입니다.
   */
  tooltip?: string;

  /**
   * 툴팁이 표시될 위치입니다.
   * @default 'top'
   */
  tooltipPosition?: UTooltipPosition;

  /**
   * 버튼이 실행할 커맨드 모델입니다.
   */
  command?: CommandModel;

  /**
   * 커맨드에 전달될 파라미터입니다.
   */
  commandParam?: any;
}