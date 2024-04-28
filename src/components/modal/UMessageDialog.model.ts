/**
 * UMessageDialogModel 인터페이스는 메시지 대화 상자의 모델을 정의합니다.
 */
export interface UMessageDialogModel {
  /**
   * 메시지 대화 상자의 타이틀입니다.
   */
  label?: string;

  /**
   * 메시지 대화 상자의 색상입니다.
   */
  color?: string;
  
  /**
   * 메시지 대화 상자의 크기입니다.
   */
  size?: string;
  
  /**
   * 메시지 대화 상자의 글꼴 두께입니다.
   */
  weight?: string;
}