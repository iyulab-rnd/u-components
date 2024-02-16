import { LitElement } from 'lit';
export declare class UButtonGroup extends LitElement {
    position: 'start' | 'center' | 'end';
    gap?: string;
    protected updated(changedProperties: any): Promise<void>;
    render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
