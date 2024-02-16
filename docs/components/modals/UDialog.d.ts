import { LitElement } from 'lit';
import SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import { UModalContent } from './UModalContent';
export declare class UDialog extends LitElement {
    dialog: SlDialog;
    open: boolean;
    label?: string;
    noHeader: boolean;
    headerActions?: HTMLElement;
    content?: UModalContent;
    render(): import("lit").TemplateResult<1>;
    private renderContent;
    showAsync(content?: UModalContent): Promise<any>;
    hideAsync(): Promise<void>;
    static styles: import("lit").CSSResult;
}
