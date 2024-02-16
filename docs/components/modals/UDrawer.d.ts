import { LitElement } from "lit";
import SlDrawer from '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import { UModalContent } from "./UModalContent";
import type { UModalResult } from "./UModalModel";
export type DrawerPosition = 'top' | 'end' | 'bottom' | 'start';
export declare class UDrawer extends LitElement {
    drawer: SlDrawer;
    open: boolean;
    label?: string;
    position: DrawerPosition;
    contained: boolean;
    noHeader: boolean;
    headerActions?: HTMLElement;
    content?: UModalContent;
    render(): import("lit").TemplateResult<1>;
    private renderContent;
    showAsync(content?: UModalContent): Promise<UModalResult>;
    hideAsync(): Promise<void>;
}
