import { UBaseInputModel } from "../input-parts/UBaseInput.model";

export type InputTextType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'month' | 'week';

export interface UTextInputModel extends UBaseInputModel {
  /**
   * The input format.
   * @todo remove this property and make separate components for each input type.
   */
  type?: InputTextType;

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