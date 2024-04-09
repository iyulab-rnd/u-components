import { UBaseInputModel } from "../input-parts/UBaseInput.model";

/**
 * Represents the model for the UObjectInput component.
 */
export interface UObjectInputModel extends UBaseInputModel {
  /**
   * The value of the input.
   */
  value?: object;
}