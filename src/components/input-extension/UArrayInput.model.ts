import { UBaseInputModel } from "../input-parts/UBaseInput.model";

/**
 * Represents the model for the UArrayInput component.
 */
export interface UArrayInputModel extends UBaseInputModel {
  /**
   * The value of the input.
   */
  value?: string[];
}