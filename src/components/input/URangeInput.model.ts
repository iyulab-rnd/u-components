import { UBaseInputModel } from "./UBaseInput.model";

export interface URangeInputModel extends UBaseInputModel {
  /**
   * The minimum value of the input.
   */
  min: number;

  /**
   * The maximum value of the input.
   */
  max: number;

  /**
   * The step value of the input.
   */
  step: number;

  /**
   * The value of the input.
   */
  value?: number;
}