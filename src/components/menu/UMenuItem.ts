import SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.component.js';
SlMenuItem.define('u-menu-item');

// import { LitElement, html } from "lit";
// import { customElement, property, query } from "lit/decorators.js";
// import { ifDefined } from "lit/directives/if-defined.js";

// import type { UMenuItemModel } from "./UMenuItemModel";

// @customElement('u-menu-item')
// export class UMenuItem extends LitElement implements UMenuItemModel {
  
//   @query('sl-menu-item') menuItem!: SlMenuItem;

//   @property({ type: String }) type: 'normal' | 'checkbox' = 'normal';
//   @property({ type: String }) value?: string;
//   @property({ type: Boolean }) checked: boolean = false;
//   @property({ type: Boolean }) loading: boolean = false;
//   @property({ type: Boolean }) disabled: boolean = false;

//   render() {
//     return html`
//       <sl-menu-item
//         type=${this.type}
//         value=${ifDefined(this.value)}
//         ?checked=${this.checked}
//         ?loading=${this.loading}
//         ?disabled=${this.disabled}
//       >
//         <slot></slot>
//         <slot slot="prefix" name="prefix"></slot>
//         <slot slot="suffix" name="suffix"></slot>
//         <slot slot="submenu" name="submenu"></slot>
//       </sl-menu-item>
//     `;
//   }

// }