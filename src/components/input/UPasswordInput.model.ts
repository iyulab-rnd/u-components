import { UBaseInputModel } from "../input-parts/UBaseInput.model";

export interface UPasswordInputModel extends UBaseInputModel {
  /**
   * The placeholder for the input.
   */
  placeholder?: string;

  /**
   * The value of the input.
   */
  value?: string;

  /**
   * The input max length.
   */
  length?: number;

  /**
   * The validation pattern for the input.
   */
  pattern?: string | RegExp;

  /**
   * The error message when the input is invalid by pattern.
   */
  invalidMessage?: string;
}