import { LitElement } from "lit";
export declare class XSplitter extends LitElement {
    host: HTMLElement;
    thumb: HTMLElement;
    orientation: "horizontal" | "vertical";
    private isDragging;
    private initValue;
    connectedCallback(): Promise<void>;
    render(): import("lit").TemplateResult<1>;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
    onKeyDown(e: KeyboardEvent): void;
    static styles: import("lit").CSSResult;
}
