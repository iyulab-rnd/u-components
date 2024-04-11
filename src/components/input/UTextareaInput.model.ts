import { UBaseInputModel } from "../input-parts/UBaseInput.model";

export interface UTextareaInputModel extends UBaseInputModel {
  /**
   * The placeholder for the input.
   */
  placeholder?: string;

  /**
   * The value of the input.
   */
  value?: string;

  /**
   * The textarea min row length.
   * @default 1
   */
  minRow?: number;

  /**
   * The textarea max row length.
   * 
   * if this value is set, the textarea will be scrollable.
   * 
   * else the textarea will be responsive.
   * @default undefined
   */
  maxRow?: number;
}