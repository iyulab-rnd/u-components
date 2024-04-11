import { UBaseInputModel } from "../input-parts/UBaseInput.model";

export interface UCheckboxInputModel extends UBaseInputModel {
  /**
   * The value of the input.
   */
  value?: boolean;

  /**
   * Required value to true.
   */
  requiredCheck?: boolean;
}