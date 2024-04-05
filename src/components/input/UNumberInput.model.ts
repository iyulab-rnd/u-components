import { UBaseInputModel } from "./UBaseInput.model";

export interface UNumberInputModel extends UBaseInputModel {
  /**
   * The placeholder for the input.
   */
  placeholder?: string;

  /**
   * The value of the input.
   */
  value?: number;

  /**
   * The number min value.
   */
  min?: number;

  /**
   * The number max value.
   */
  max?: number;
}