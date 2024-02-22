import type { LitElement, TemplateResult } from "lit";

/**
 * 알림에 대한 모델을 나타냅니다.
 */
export interface UAlertModel {
  /**
   * 알림의 유형입니다.
   */
  type: AlertType;
  /**
   * 알림의 내용입니다.
   */
  content?: AlertContent;
  /**
   * 알림의 지속 시간(밀리초)입니다.
   */
  duration: number;
  /**
   * 알림이 열려 있는지 여부입니다.
   */
  open: boolean;
  /**
   * 알림창에 닫기 버튼이 표시되는지 여부입니다.
   */
  closable: boolean;
  /**
   * 알림을 토스트로 표시합니다.
  */
  toastAsync: (type: AlertType, content: AlertContent, duration: number) => Promise<void>;
  /**
   * 알림을 엽니다.
   */
  show: () => void;
  /**
   * 알림을 닫습니다.
   */
  hide: () => void;
}

export type AlertType = ( 
  "primary" | 
  "neutral" | 
  "success" | 
  "warning" | 
  "danger"
);

export type AlertContent = (
  string | 
  HTMLElement | 
  LitElement | 
  TemplateResult
);