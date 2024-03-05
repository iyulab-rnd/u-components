import SlMenu from '@shoelace-style/shoelace/dist/components/menu/menu.component.js';
SlMenu.define('u-menu');

// import { LitElement, html } from "lit";
// import { customElement, query } from "lit/decorators.js";

// @customElement('u-menu')
// export class UMenu extends LitElement {
  
//   @query('sl-menu') menu!: SlMenu;

//   render() {
//     return html`
//       <sl-menu @sl-select=${this.onSelect}>
//         <slot></slot>
//       </sl-menu>
//     `;
//   }

//   private async onSelect(event: CustomEvent) {
//     console.log('onSelect', event.detail);
//     this.dispatchEvent(new CustomEvent('select', { 
//       detail: event.detail,
//       bubbles: true,
//     }));
//   }

// }