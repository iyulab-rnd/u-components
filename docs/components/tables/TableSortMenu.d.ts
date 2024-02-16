import { UFlyout, UFlyoutPosition } from "../flyouts";
import type { SearchColumn } from "./UTableModel";
export declare class TableSortMenu extends UFlyout {
    keepHover: boolean;
    position: UFlyoutPosition;
    name?: string;
    orderby?: 'asc' | 'desc';
    render(): import("lit").TemplateResult<1>;
    showSortAsync(event: MouseEvent, search?: SearchColumn): Promise<void>;
    private handleSortClick;
    static styles: import("lit").CSSResult;
}
