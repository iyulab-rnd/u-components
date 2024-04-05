import { UBaseInputModel } from "./UBaseInput.model";

export type InputTextFormat = 'text' | 'email' | 'password' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'month' | 'week';

export interface UTextInputModel extends UBaseInputModel {
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
   * The input format.
   */
  fotmat?: InputTextFormat;

  /**
   * The validation pattern for the input.
   */
  pattern?: string | RegExp;

  /**
   * The error message when the input is invalid by pattern.
   */
  invalidMessage?: string;
}