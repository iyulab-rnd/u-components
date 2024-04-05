import SlCard from '@shoelace-style/shoelace/dist/components/card/card.component.js';
SlCard.define('u-card');

// import { html, LitElement } from 'lit'
// import { customElement, query } from 'lit/decorators.js'

// @customElement('u-card')
// export class UCard extends LitElement {

//   @query('sl-card')
//   card!: SlCard;

//   render() {
//     return html`
//       <sl-card>
//         ${this.renderSlot()}
//         <slot></slot>
//       </sl-card>
//     `;
//   }

//   private renderSlot() {
//     const slots = ['image', 'header', 'footer'];
//     return html`
//       ${slots.map(slot => this.hasSlot(slot) 
//         ? html`<slot slot="${slot}" name="${slot}"></slot>` 
//         : '')}
//     `;
//   }

//   private hasSlot(name: string): boolean {
//     return this.querySelector(`[slot="${name}"]`) !== null;
//   }
  
// }