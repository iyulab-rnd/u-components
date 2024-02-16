import { UFlyout, UFlyoutPosition } from "../flyouts";
import type { SearchOption, ColumnDefinition } from "./UTableModel";
export declare class TableSearchMenu extends UFlyout {
    keepHover: boolean;
    position: UFlyoutPosition;
    search?: SearchOption;
    columns?: ColumnDefinition[];
    render(): import("lit").TemplateResult<1>;
    showSearchAsync(event: MouseEvent, columns: ColumnDefinition[], search: SearchOption): Promise<void>;
    hideClickAsync(): Promise<void>;
    private renderSearchList;
    private renderFilterItem;
    private renderOrderBy;
    private handleSetSearch;
    private handleChangeValue;
    private handleChangeRange;
    private handleSelectedItem;
    private handleChangeOrder;
    private formatDate;
    static styles: import("lit").CSSResult;
}
