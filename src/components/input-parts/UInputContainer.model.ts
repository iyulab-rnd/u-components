export type LabelPosition = 'top' | 'left';

/**
 * Represents the model for the UInputContainer component.
 */
export interface UInputContainerModel {
  /**
   * The position of the label relative to the input field.
   * @default 'top'
   */
  labelPosition?: LabelPosition;
  
  /**
   * Specifies whether the input field is disabled.
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Specifies whether the input field is read-only.
   * @default false
   */
  readonly?: boolean;
  
  /**
   * Specifies whether the input field is required.
   * @default false
   */
  required?: boolean;
  
  /**
   * The label text for the input field.
   */
  label?: string;
  
  /**
   * The description text for the input field.
   */
  description?: string;
  
  /**
   * The error message to display for the input field.
   */
  error?: string;
}