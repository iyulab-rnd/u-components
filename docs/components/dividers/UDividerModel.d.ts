/**
 * UDividerModel 인터페이스는 구분선 모델을 나타냅니다.
 */
export interface UDividerModel {
    /**
     * 색상을 지정합니다.
     */
    color?: string;
    /**
     * 구분선의 굵기를 지정합니다. 픽셀 단위로 지정합니다.
     */
    width?: number;
    /**
     * 구분선의 마진을 지정합니다. 픽셀 단위로 지정합니다.
     */
    space?: number;
    /**
     * 구분선의 방향을 지정합니다.
     * - 'vertical': 수직 방향
     * - 'horizontal': 수평 방향
     */
    orientation: 'vertical' | 'horizontal';
}
