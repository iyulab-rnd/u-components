import type { PropertyMetaData, PropertyMetaType } from "../../decorators";
import type { LabelPosition } from "../input-parts/UInputContainer.model";

/**
 * UInputModel 인터페이스는 UInput 컴포넌트의 모델을 정의합니다.
 */
export interface UInputModel {
  
  /**
   * 라벨의 위치를 지정합니다.
   * @default "top"
   */
  labelPosition?: LabelPosition;
  
  /**
   * 입력 필드의 크기를 지정합니다.
   * @default "14px"
   */
  size?: string;
  
  /**
   * 속성의 메타데이터를 포함하는 객체입니다.
   */
  meta?: PropertyMetaData;
  
  /**
   * 입력 필드의 타입을 지정합니다.
   */
  type?: PropertyMetaType;

  /**
   * 컴포넌트의 컨텍스트를 지정합니다.
   */
  context?: any;

  /**
   * 입력 필드의 이름을 지정합니다.
   */
  name?: string;

}