import { UBaseInputModel } from "../input-parts/UBaseInput.model";

/**
 * Represents an option in the USelectInput component.
 */
export interface USelectOption {
  /**
   * The icon follows the u-icon component's type="default" and is prefixed to the option.
   */
  icon?: string;
  
  /**
   * The display text of the option.
   * If not provided, the value will be used.
   */
  display?: string;
  
  /**
   * The value of the option.
   */
  value: string;
}

/**
 * Represents the model for a select input component.
 */
export interface USelectInputModel extends UBaseInputModel {
  /**
   * The open state of the select input.
   */
  placeholder?: string;

  /**
   * The options for the select input.
   * It can be an array of strings or an array of USelectOption objects.
   */
  options?: string[] | USelectOption[];

  /**
   * The default value for the select input.
   */
  default?: string;

  /**
   * The display text of the select input.
   * This is used when the select option is an select option object.
   */
  display?: string;

  /**
   * The current value of the select input.
   */
  value?: string;
}