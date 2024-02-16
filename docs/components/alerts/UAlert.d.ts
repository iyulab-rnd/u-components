import { LitElement } from "lit";
import SlAlert from "@shoelace-style/shoelace/dist/components/alert/alert.js";
import type { UAlertModel, AlertType, AlertContent } from "./UAlertModel";
export declare class UAlert extends LitElement implements UAlertModel {
    alert: SlAlert;
    type: AlertType;
    duration: number;
    content?: AlertContent;
    render(): import("lit").TemplateResult<1>;
    private renderIcon;
    showAsync(type: AlertType, content: AlertContent, duration?: number): Promise<void>;
}
