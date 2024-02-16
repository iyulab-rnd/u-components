import { LitElement, TemplateResult } from "lit";
import SlTooltip from '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import type { UTooltipModel } from "./UTooltipModel";
export declare class UTooltip extends LitElement implements UTooltipModel {
    tooltip: SlTooltip;
    content?: string | HTMLElement | LitElement | TemplateResult;
    position: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
    arrow: boolean;
    distance?: number;
    maxWidth?: number;
    update(changedProperties: any): Promise<void>;
    render(): TemplateResult<1>;
    renderContent(): TemplateResult<1>;
}
