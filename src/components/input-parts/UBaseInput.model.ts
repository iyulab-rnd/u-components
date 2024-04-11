/**
 * Represents the model for a base input component.
 */
export interface UBaseInputModel {
  /**
   * Specifies whether the input is required or not.
   * @default false
   */
  required?: boolean;

  /**
   * Specifies whether the input is disabled or not.
   * @default false
   */
  disabled?: boolean;

  /**
   * Specifies whether the input is readonly or not.
   * @default false
   */
  readonly?: boolean;

  /**
   * The label for the input.
   */
  label?: string;

  /**
   * The description for the input.
   */
  description?: string;

  /**
   * The error message associated with the input.
   */
  error?: string;

  /**
   * The size of the input component.
   * @default "14px"
   */
  size?: string;

  /**
   * Additional context information for the input.
   */
  context?: any;

  /**
   * The property name of the context.
   */
  name?: string;

  /**
   * The value of the input.
   */
  value?: any;
}