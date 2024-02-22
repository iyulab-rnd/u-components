import { LitElement, html, nothing } from "lit";
import { customElement, property, query, queryAll } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.component.js';
import SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.component.js';
SlMenu.define('sl-menu');
SlMenuItem.define('sl-menu-item');

import type { UMenuItem } from "./UMenuModel";

@customElement('u-menu')
export class UMenu extends LitElement {
  
  @query('sl-menu') menu!: SlMenu;
  @queryAll('sl-menu-item') menuItems!: SlMenuItem[];

  @property({ type: Array }) items: UMenuItem[] = [];

  render() {
    return html`
      <sl-menu @sl-select=${this.onSelect}>
        ${this.renderItems()}
      </sl-menu>
    `;
  }

  private renderItems() {
    return this.items.map(item => {
      return html`
        <sl-menu-item
          type=${item.type || 'normal'}
          value=${ifDefined(item.value)}
          ?checked=${item.checked || false}
          ?loading=${item.loading || false}
          ?disabled=${item.disabled || false}
          @click=${() => this.onAction(item)}
        >
          ${item.icon ? html`<u-icon slot="prefix" name=${item.icon}></u-icon>` : nothing}
          ${item.display || item.value || nothing}
          ${item.subMenu ? html`<u-menu slot="submenu" .items=${item.subMenu}></u-menu>` : nothing}
        </sl-menu-item>
      `;
    });
  }

  private async onSelect(event: CustomEvent) {
    this.dispatchEvent(new CustomEvent('select', { 
      detail: event.detail,
      bubbles: true,
    }));
  }

  private async onAction(item: UMenuItem) {
    if(!item.onAction) return;
    await item.onAction(item);
  }

}