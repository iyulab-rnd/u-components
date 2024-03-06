/**
 * Represents the model for a progress component.
 */
export interface UProgressModel {
  /**
   * The type of the progress component.
   * Can be either 'ring' or 'bar'.
   */
  type: 'ring' | 'bar';

  /**
   * The value of the progress component.
   * Represents the current progress value.
   */
  value?: number;

  /**
   * The label of the progress component.
   * Represents the text displayed on top of the progress component.
   */
  label?: string;

  /**
   * Indicates whether the bar progress component is infinite.
   * If set to true, the bar progress component will animate indefinitely.
   */
  Infinite?: boolean;

  /**
   * The thickness of the progress component.
   * Represents the width or thickness of the progress bar or ring.
   */
  thickness?: string;

  /**
   * The color of the progress component's track.
   * Represents the background color of the progress bar or ring.
   */
  trackColor?: string;

  /**
   * The color of the progress component's indicator.
   * Represents the color of the progress bar or ring.
   */
  indicatorColor?: string;
}