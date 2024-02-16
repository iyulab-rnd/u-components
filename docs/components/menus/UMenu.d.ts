import { LitElement } from "lit";
import SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.js';
import SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import type { UMenuItem } from "./UMenuModel";
export declare class UMenu extends LitElement {
    menu: SlMenu;
    menuItems: SlMenuItem[];
    items: UMenuItem[];
    render(): import("lit").TemplateResult<1>;
    private renderItems;
    private onSelect;
}
