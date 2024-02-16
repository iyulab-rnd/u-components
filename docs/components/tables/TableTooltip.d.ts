import { UFlyout, UFlyoutPosition } from "../flyouts";
type getTooltipData = (data: any) => string | HTMLElement;
export declare class TableTooltip extends UFlyout {
    keepHover: boolean;
    position: UFlyoutPosition;
    content?: HTMLElement | string;
    render(): import("lit").TemplateResult<1>;
    hoverButton(event: MouseEvent, display: string): Promise<void>;
    hoverData(event: MouseEvent, item: any, tooltip?: getTooltipData): Promise<void>;
    static styles: import("lit").CSSResult;
}
export {};
