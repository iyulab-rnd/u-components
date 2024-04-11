import { UBaseInputModel } from "../input-parts/UBaseInput.model";

export interface UUrlInputModel extends UBaseInputModel {
  /**
   * Available URL schemes (or protocols) for the URL input, e.g., "http://", "https://".
   */
  schemes?: string[];

  /**
   * The placeholder for the input.
   */
  placeholder?: string;

  /**
   * The value of the input.
   */
  value?: string;
}