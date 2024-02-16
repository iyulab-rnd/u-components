import { LitElement } from 'lit';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.js';
import type { UButtonTheme, UButtonSize, UButtonType, UButtonLink } from './UBottonModel';
import type { UTooltipPosition } from '../tooltips/UTooltipModel';
import type { CommandModel } from '../../patterns/CommandPattern';
export declare class UButton extends LitElement {
    button: SlButton;
    type: UButtonType;
    theme: UButtonTheme;
    outline: boolean;
    text?: string;
    size: UButtonSize;
    link?: UButtonLink;
    round: boolean;
    disabled: boolean;
    loading: boolean;
    tooltip?: string;
    tooltipPosition: UTooltipPosition;
    onClick?: () => Promise<void>;
    command?: CommandModel;
    commandParam?: any;
    updated(changedProperties: any): Promise<void>;
    render(): import("lit").TemplateResult<1>;
    private renderButtonAndTooltip;
    private renderButton;
    private renderChildren;
    private handleButtonClick;
    static styles: import("lit").CSSResult;
}
