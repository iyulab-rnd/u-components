import { LitElement } from "lit";
import SlSpinner from "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import type { USpinnerModel } from "./USpinnerModel";
export declare class USpinner extends LitElement implements USpinnerModel {
    spinner: SlSpinner;
    size?: number;
    width?: string;
    indicatorColor?: string;
    trackColor?: string;
    protected updated(changedProperties: any): Promise<void>;
    render(): import("lit").TemplateResult<1>;
}
