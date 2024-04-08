import type { LitElement, TemplateResult } from "lit";

export type AlertType = ( 
  "primary" | "neutral" | "success" | 
  "warning" | "danger"
);

export type AlertContent = (
  string | HTMLElement | 
  LitElement | TemplateResult<1>
);

export type ToastPosition = (
  'top-left' | 'top-center' | 'top-right' | 
  'bottom-left' | 'bottom-center' | 'bottom-right'
)

/**
 * 알림에 대한 모델을 나타냅니다.
 */
export interface UAlertModel {
  /**
   * 알림이 열려 있는지 여부입니다.
   */
  open: boolean;

  /**
   * 알림창에 닫기 버튼이 표시되는지 여부입니다.
   */
  closable: boolean;

  /**
   * 알림의 유형입니다.
   */
  type: AlertType;

  /**
   * 알림의 제목입니다.
   */
  label?: string;

  /**
   * 알림의 내용입니다.
   */
  content?: AlertContent;
  
  /**
   * 알림을 엽니다.
   */
  showAsync: () => Promise<void>;

  /**
   * 알림을 닫습니다.
   */
  hideAsync: () => Promise<void>;
}

/**
 * 토스트 옵션 인터페이스입니다.
 */
export interface ToastOption {
  /**
   * 알림 타입입니다.
   */
  type: AlertType;
  /**
   * 라벨입니다.
   */
  label?: string;
  /**
   * 알림 내용입니다.
   */
  content: AlertContent;
  /**
   * 토스트 위치입니다.
   */
  position?: ToastPosition;
  /**
   * 토스트 지속 시간입니다.
   */
  duration?: number;
}