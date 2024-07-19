export interface DataViewColumnDefinition {
  name: string;
  display?: string;
}

/**
 * UDataViewModel 인터페이스는 데이터 뷰 모델을 나타냅니다.
 */
export interface UDataViewModel {
  /**
   * 표시할 데이터 배열을 지정합니다.
   */
  data: any[];

  /**
   * 데이터 뷰의 레이아웃을 지정합니다. ('list', 'grid' 또는 'table')
   */
  layout?: "list" | "grid" | "table";

  /**
   * 표시할 열 정보를 지정합니다. 지정하지 않으면 이미지를 제외한 모든 필드가 표시됩니다.
   */
  columns?: DataViewColumnDefinition[];

  /**
   * 각 아이템을 렌더링하는 함수를 지정합니다.
   */
  renderItem?: (item: any) => HTMLElement;

  /**
   * 각 아이템의 이미지를 렌더링하는 함수를 지정합니다.
   */
  renderImage?: (item: any) => HTMLElement;

  /**
   * 각 아이템의 필드를 렌더링하는 함수를 지정합니다.
   */
  renderFields?: (item: any) => HTMLElement;

  /**
   * 페이지당 표시할 아이템 수를 지정합니다.
   */
  itemsPerPage?: number;

  /**
   * 아이템의 이미지 필드 이름을 지정합니다.
   */
  imageField?: string;

  /**
   * 아이템 간 마진을 지정합니다.
   */
  itemMargin?: string;

  /**
   * 그리드 레이아웃에서 아이템의 최소 너비를 지정합니다.
   */
  minItemWidth?: string;
  
  /**
   * 아이템 선택 시 호출되는 콜백 함수를 지정합니다.
   */
  onItemSelect?: (item: any) => void;

  /**
   * 아이템 더블 클릭 시 호출되는 콜백 함수를 지정합니다.
   */
  onItemDoubleClick?: (item: any) => void;
}