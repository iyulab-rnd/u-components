import { LitElement } from "lit";
import type { PropertyMetaData } from "../../decorators";
import { UInput } from "../inputs";
import { UButton } from "../buttons";
export declare class UForm extends LitElement {
    inputs: UInput[];
    submit: UButton;
    keys: string[];
    label?: string;
    noHeader: boolean;
    noFooter: boolean;
    context: any;
    meta: PropertyMetaData[];
    onSubmit?: (context: any) => Promise<void>;
    include: string[];
    exclude: string[];
    protected updated(changedProperties: any): Promise<void>;
    render(): import("lit").TemplateResult<1>;
    private renderHeader;
    private renderForm;
    private renderFooter;
    private handleSubmit;
    checkValidity(): Promise<boolean>;
    static styles: import("lit").CSSResult;
}
