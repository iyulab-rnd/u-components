import { LitElement, html } from "lit";
import { customElement, property, query, queryAll } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';

import { UMenuItemModel } from "./UMenuItemModel";

@customElement('u-menu')
export class UMenu extends LitElement {
  
  @query('sl-menu')
  menu!: SlMenu;

  @queryAll('sl-menu-item')
  menuItems!: SlMenuItem[];

  @property({ type: Array })
  items: UMenuItemModel[] = [];

  render() {
    return html`
      <sl-menu @sl-select=${this.onSelect}>
        ${this.renderItems()}
      </sl-menu>
    `;
  }

  renderItems() {
    return this.items.map(item => {
      return html`
        <sl-menu-item 
          type=${ifDefined(item.type)}
          value=${ifDefined(item.value)}
          ?checked=${item.checked}
          ?loading=${item.loading}
          ?disabled=${item.disabled}
        >
          ${item.icon ? html`<u-icon slot="prefix" name=${item.icon}></u-icon>` : ''}
          ${item.display}
          ${item.subMenu ? html`<u-menu slot="submenu" .items=${item.subMenu}></u-menu>` : ''}
        </sl-menu-item>
      `;
    });
  }

  private onSelect(event: CustomEvent) {
    this.dispatchEvent(new CustomEvent('select', { 
      detail: event.detail 
    }));
  }

}