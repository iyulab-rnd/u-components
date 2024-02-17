import type { LitElement, TemplateResult } from "lit";

/**
 * UTooltipPosition 타입은 툴팁의 위치를 정의합니다.
 */
export type UTooltipPosition = 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';

/**
 * UTooltipModel 인터페이스는 툴팁의 모델을 정의합니다.
 */
export interface UTooltipModel {
  /**
   * 툴팁의 내용입니다.
   * @type {string | HTMLElement | LitElement}
   * @default undefined
   */
  content?: string | HTMLElement | LitElement | TemplateResult;

  /**
   * 툴팁의 위치입니다.
   * @type {UTooltipPosition}
   * @default 'top'
   */
  position: UTooltipPosition;

  /**
   * 툴팁에 화살표를 표시할지 여부입니다.
   * @type {boolean}
   * @default false
   */
  arrow: boolean;

  /**
   * 툴팁과의 거리입니다. 픽셀단위로 지정합니다.
   * @type {number}
   * @default undefined
   */
  distance?: number;

  /**
   * 툴팁의 최대 너비입니다. 픽셀단위로 지정합니다.
   * @type {number}
   * @default undefined
   */
  maxWidth?: number;
  
}