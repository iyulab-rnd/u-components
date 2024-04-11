import { UBaseInputModel } from "../input-parts/UBaseInput.model";

export interface UNumberInputModel extends UBaseInputModel {

  /**
 * The number min value.
 */
  min?: number;

  /**
   * The number max value.
   */
  max?: number;

  /**
   * Indicates whether the input is integer only.
   * @default false
   */
  integerOnly?: boolean;

  /**
   * The placeholder for the input.
   */
  placeholder?: string;

  /**
   * The value of the input.
   */
  value?: number;

}