export interface UInputLabelModel {
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
}