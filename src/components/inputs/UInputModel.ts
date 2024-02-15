
export interface UInputModel extends UInputMeta {
  value?: any;
  context?: any;
  path?: string;
}

export interface UInputMeta {
  type: UInputType;
  size: UInputSize;
  disabled: boolean;
  readonly: boolean;
  filled: boolean;
  rounded: boolean;
  clearable: boolean;
  label?: string;
  help?: string;
  icon?: string;
  hint?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  autofocus: boolean;
  selectItems?: UInputSelectItem[];  
  default?: any;
  required: boolean;
  pattern?: string;
  invalidMessage?: string;
}

export type UInputType = (
  'text' | 'email' | 'search' | 'url' | 'tel' |
  'date' | 'datetime-local' | 'time' |
  'number' | 'password' | 
  'textarea' |
  'checkbox' | 
  'select' | 'multi-select' |
  'color'
);

export type UInputSize = ( 'small' | 'medium' | 'large' );

export interface UInputSelectItem {
  display: string;
  value: any;
  disabled?: boolean;
}