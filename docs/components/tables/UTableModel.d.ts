export interface UTableModel {
    loading: boolean;
    total?: number;
    search: SearchOption;
    selectedItems: any[];
    data: any[];
    option?: TableOption;
    columns: ColumnDefinition[];
    buttons: ButtonDefinition[];
}
export interface TableOption {
    useCount?: boolean;
    useCheckbox?: boolean;
    usePaging?: boolean;
    limit?: number;
    firstLoad?: (search?: SearchOption) => Promise<{
        data: any[];
        total?: number;
    }>;
    load?: (search?: SearchOption) => Promise<{
        data: any[];
        total?: number;
    }>;
    delete?: (items: any[]) => Promise<boolean>;
    update?: (item: any) => Promise<void>;
    create?: () => Promise<void>;
}
export type ColumnDefinition = BasicColumn | BadgeColumn | ImgColumn;
export interface ColumnBase {
    name: string;
    title: string;
    order: number;
    widthRatio?: number;
    headAlign?: 'left' | 'center' | 'right';
    bodyAlign?: 'left' | 'center' | 'right';
    useSort?: boolean;
    useFilter?: 'text' | 'numberRange' | 'dateRange' | 'select';
    selectList?: string[];
    tooltip?: (item: any) => string | HTMLElement;
    action?: (item: any) => Promise<void>;
}
export interface BasicColumn extends ColumnBase {
    type: 'basic';
    render?: (item: any) => string | HTMLElement;
}
export interface BadgeColumn extends ColumnBase {
    type: 'badge';
    render: (item: any) => {
        text: string;
        color: string;
    };
}
export interface ImgColumn extends ColumnBase {
    type: 'img';
    render: (item: any) => {
        src: string;
        width?: number;
        height?: number;
    };
}
export type ButtonDefinition = TableButton | ItemButton;
export interface ButtonBase {
    display: string;
    svgData: string;
    svgViewBox: string;
    color?: string;
}
export interface TableButton extends ButtonBase {
    type: 'table';
    action: (items: any[], table: UTableModel) => Promise<void>;
}
export interface ItemButton extends ButtonBase {
    type: 'item';
    action: (item: any, table: UTableModel) => Promise<void>;
}
export type SearchColumn = SearchNotFilter | SearchTextFilter | SearchNumberRangeFilter | SearchDateRangeFilter | SearchSelectFilter;
export interface SearchBase {
    name: string;
    orderby?: 'asc' | 'desc';
}
export interface SearchNotFilter extends SearchBase {
    type: undefined;
}
export interface SearchTextFilter extends SearchBase {
    type: 'text';
    value?: string;
}
export interface SearchNumberRangeFilter extends SearchBase {
    type: 'numberRange';
    numberFrom?: number;
    numberTo?: number;
}
export interface SearchDateRangeFilter extends SearchBase {
    type: 'dateRange';
    dateFrom?: Date;
    dateTo?: Date;
}
export interface SearchSelectFilter extends SearchBase {
    type: 'select';
    list: string[];
}
export interface SearchOption {
    limit: number;
    offset: number;
    columns: SearchColumn[];
}
export declare const UTableIcons: {
    search: string;
    trash: string;
    refresh: string;
    plus: string;
    edit: string;
    sort: string;
    desc: string;
    filter: string;
    firstPage: string;
    lastPage: string;
    beforePage: string;
    nextPage: string;
    notFound: string;
};
