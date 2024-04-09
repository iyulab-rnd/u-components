import { UBaseInputModel } from "../input-parts/UBaseInput.model";

export interface UEditorInputModel extends UBaseInputModel {
  /**
   * The editor language.
   * @default 'json'
   */
  language?: string;

  /**
   * The editor font size.
   * @default 14
   */
  fontSize?: number;

  /**
   * The value of the input.
   */
  value?: string;
}