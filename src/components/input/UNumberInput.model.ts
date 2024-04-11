import { UBaseInputModel } from "../input-parts/UBaseInput.model";

export type NumberInputFormat = 'float' | 'integer';

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
   * Indicates whether the input is float or integer.
   * @default 'float'
   */
  format?: NumberInputFormat;

  /**
   * The placeholder for the input.
   */
  placeholder?: string;

  /**
   * The value of the input.
   */
  value?: number;

}