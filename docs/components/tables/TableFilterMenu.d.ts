import { UFlyout, UFlyoutPosition } from "../flyouts";
import type { ColumnDefinition, SearchColumn } from "./UTableModel";
export declare class TableFilterMenu extends UFlyout {
    keepHover: boolean;
    position: UFlyoutPosition;
    search?: SearchColumn;
    selectList: string[];
    render(): import("lit").TemplateResult<1>;
    showFilterAsync(event: MouseEvent, column: ColumnDefinition, search?: SearchColumn): Promise<void>;
    hideClickAsync(): Promise<void>;
    private renderBody;
    private handleSetFilter;
    private handleChangeValue;
    private handleChangeRange;
    private handleSelectedItem;
    private formatDate;
    static styles: import("lit").CSSResult;
}
