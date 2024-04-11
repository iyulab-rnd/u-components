import { UBaseInputModel } from "../input-parts/UBaseInput.model";

export interface UEmailInputModel extends UBaseInputModel {
  /**
   * The domain options for the email input.
   */
  domains?: string[];

  /**
   * The value of the input.
   */
  value?: string;
}