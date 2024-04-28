import type { PropertyMetaData } from "../../decorators/PropertyMeta.model";

/**
 * UInputDialog 컴포넌트의 모델을 나타냅니다.
 */
export interface UInputDialogModel {
  /**
   * 입력 대화 상자의 라벨입니다.
   */
  label?: string;

  /**
   * 입력 대화 상자에 대한 추가 메타데이터입니다.
   */
  meta?: PropertyMetaData;

  /**
   * 입력 대화 상자의 값입니다.
   */
  value?: any;
}

/**
 * UInputDialogResult 인터페이스는 UInputDialog의 결과를 나타냅니다.
 */
export interface UInputDialogResult {
  /**
   * 확인 버튼을 클릭했는지 여부입니다.
   */
  confirmed: boolean;

  /**
   * 입력된 값입니다.
   */
  value: any;
}