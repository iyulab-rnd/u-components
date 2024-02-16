import { LitElement, TemplateResult } from "lit";
import type { UTableModel, TableOption, ButtonDefinition, ColumnDefinition, SearchOption } from "./UTableModel";
export declare class UTable extends LitElement implements UTableModel {
    static styles: import("lit").CSSResult;
    private tooltip;
    private searchMenu;
    private sortMenu;
    private filterMenu;
    table: HTMLTableElement;
    headerCheckbox: HTMLInputElement;
    loading: boolean;
    total?: number;
    search: SearchOption;
    selectedItems: any[];
    data: any[];
    option?: TableOption;
    columns: ColumnDefinition[];
    buttons: ButtonDefinition[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(_changedProperties: any): Promise<void>;
    updated(_changedProperties: any): Promise<void>;
    render(): TemplateResult<1>;
    loadDataAsync(): Promise<void>;
    private deleteDataAsync;
    private renderLoadingSpinner;
    private renderTableMenu;
    private renderTableButtons;
    private renderHeader;
    private renderSortMenu;
    private renderFilterMenu;
    private renderBody;
    private renderBodyItem;
    private renderBasicCell;
    private renderBadgeCell;
    private renderImgCell;
    private renderButtonCell;
    private renderButton;
    private renderPageNation;
    private handleChangePerPage;
    private handleChangePage;
    private handlePageLoadClick;
    private handleSortEvent;
    private handleFilterEvent;
    private handleSearchEvent;
    private handleHeaderCheckbox;
    private handleBodyCheckbox;
    private handleAdjustWidth;
    private adjustWidthControlHeight;
    private handleAdjustHeight;
}