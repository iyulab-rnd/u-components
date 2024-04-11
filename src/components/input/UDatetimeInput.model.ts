import { UBaseInputModel } from "../input-parts/UBaseInput.model";

export type DatetimeInputFormat = 'date' | 'time' | 'datetime-local' | 'month' | 'week';

export interface UDatetimeInputModel extends UBaseInputModel {
  /**
   * The datetime input format.
   */
  format?: DatetimeInputFormat;

  /**
   * The value of the input.
   */
  value?: string;
}