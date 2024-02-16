import { LitElement } from "lit";
export declare class GridUnit extends LitElement {
    item1: HTMLElement;
    item2: HTMLElement;
    key?: string;
    orientation: "horizontal" | "vertical";
    init: string;
    firstUpdated(_changedProperties: any): Promise<void>;
    updated(changedProperties: any): Promise<void>;
    render(): import("lit").TemplateResult<1>;
    onDragged(e: CustomEvent): void;
    resize(v: number): void;
    save(): void;
    load(): void;
    static styles: import("lit").CSSResult;
}
