import { LitElement } from "lit";
import SlIcon from '@shoelace-style/shoelace/dist/components/icon/icon.js';
import type { UIconModel } from "./UIconModel";
export declare class UIcon extends LitElement implements UIconModel {
    icon: SlIcon;
    name?: string;
    src?: string;
    size?: number;
    color?: string;
    protected updated(changedProperties: any): Promise<void>;
    render(): import("lit").TemplateResult<1>;
}
