import type { PropertyMetaData } from "../../decorators/PropertyMeta.model";
import type { LabelPosition } from "../input-parts/UInputContainer.model";
import type { UButtonSize } from "../button/UButton.model";

/**
 * UFormModel은 UForm 컴포넌트의 모델을 정의하는 인터페이스입니다.
 */
export interface UFormModel {

  /**
   * 입력 컴포넌트의 키 배열입니다. 컨텍스트를 기반으로 자동으로 설정됩니다.
   */
  keys?: string[];

  /**
   * 제출버튼의 로딩 상태를 설정합니다.
   * @default false
   */
  loading?: boolean;

  /**
   * 상단타이틀을 표시하지 않을지 여부를 설정합니다.
   * @default false
   */
  noHeader?: boolean;
  
  /**
   * 하단 버튼을 표시하지 않을지 여부를 설정합니다.
   * @default false
   */
  noFooter?: boolean;
  
  /**
   * 입력 컴포넌트의 크기를 설정하는 값입니다. font-size 속성으로 설정됩니다.
   * @default '14px'
   */
  size?: string;
  
  /**
   * 입력 서식의 버튼 크기를 설정하는 값입니다.
   * @default 'small'
   */
  buttonSize?: UButtonSize;
  
  /**
   * 입력 서식의 타이틀 텍스트를 설정합니다.
   */
  headLine?: string;

  /**
   * 인풋 컴포넌트 라벨의 위치를 설정하는 값입니다.
   * @default 'top'
   */
  labelPosition?: LabelPosition;

  /**
   * 포함할 속성의 배열입니다.
   */
  include?: string[];

  /**
   * 제외할 속성의 배열입니다.
   */
  exclude?: string[];

  /**
   * 컨텍스트 객체입니다.
   */
  context?: any;

  /**
   * 컨텍스트 속성의 메타데이터 배열입니다.
   */
  meta?: PropertyMetaData[];

}