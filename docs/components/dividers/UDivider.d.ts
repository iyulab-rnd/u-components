import { LitElement } from "lit";
import SlDivider from '@shoelace-style/shoelace/dist/components/divider/divider.js';
import type { UDividerModel } from "./UDividerModel";
export declare class UDivider extends LitElement implements UDividerModel {
    divider: SlDivider;
    color?: string;
    width?: number;
    space?: number;
    orientation: 'vertical' | 'horizontal';
    protected updated(changedProperties: any): Promise<void>;
    render(): import("lit").TemplateResult<1>;
}
