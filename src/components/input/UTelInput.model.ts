import { UBaseInputModel } from "../input-parts/UBaseInput.model";

export interface UTelInputModel extends UBaseInputModel {
  /**
   * Include the national code in the telephone number.
   */
  nationalCode?: number[];

  /**
   * The value of the input.
   */
  value?: string;

  /**
   * The telephone number format.
   */
  segments?: number[];
}