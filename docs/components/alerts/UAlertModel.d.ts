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
     * 알림을 표시합니다.
    */
    showAsync: (type: AlertType, content: AlertContent, duration: number) => Promise<void>;
}
export type AlertType = ("primary" | "neutral" | "success" | "warning" | "danger");
export type AlertContent = (string | HTMLElement | LitElement | TemplateResult);
