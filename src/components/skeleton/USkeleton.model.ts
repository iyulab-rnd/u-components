export type SkeletonEffect = "none" | "sheen" | "pulse";

/**
 * 스켈레톤에 대한 모델을 나타냅니다.
 */
export interface USkeletonModel {
  /**
   * 스켈레톤의 효과입니다.
   */
  effect: SkeletonEffect;

  /**
   * 스켈레톤의 너비입니다.
   */
  width?: string;

  /**
   * 스켈레톤의 높이입니다.
   */
  height?: string;
}