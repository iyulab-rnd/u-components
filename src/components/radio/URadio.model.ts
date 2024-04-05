/**
 * URadioModel 인터페이스는 URadio 컴포넌트의 모델을 정의합니다.
 */
export interface URadioModel {
  /**
   * Radio의 타입을 나타냅니다.
   * @default 'radio'
   */
  type?: URadioType;
  /**
   * URadio의 라벨을 나타냅니다.
   */
  label: string;
  /**
   * URadio에 대한 도움말을 나타냅니다.
   */
  help?: string;
  /**
   * URadio의 초기값(value)을 나타냅니다.
   */
  value?: string;
  /**
   * URadio의 크기를 나타냅니다.
   * @default 'medium'
   */
  size?: URadioSize;
  /**
   * URadio의 필수 여부를 나타냅니다.
   * @default false
   */
  required?: boolean;
  /**
   * URadio의 항목 리스트를 나타냅니다.
   */
  list: URadioItem[];
}

export type URadioSize = 'small' | 'medium' | 'large';
export type URadioType = 'radio' | 'button';

/**
 * URadio의 항목을 정의합니다.
 */
export interface URadioItem {
  /**
   * Radio의 표시값을 나타냅니다.
  */
  display: string;
  /**
   * Radio의 실제값을 나타냅니다.
  */
  value: string;
  /**
   * Radio의 비활성화 여부를 나타냅니다.
  */
  disabled?: boolean;
}