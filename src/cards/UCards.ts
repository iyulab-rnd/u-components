import { css, html, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import '@shoelace-style/shoelace/dist/components/card/card.js';
import SlCard from '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('u-cards')
export class UCards extends LitElement {

  @query('sl-card')
  card!: SlCard;

  render() {
    return html`
      <sl-card>
        <div slot="header">
          <slot name="header"></slot>
        </div>
        <div slot="image">
          <slot name="image"></slot>
        </div>
        <slot></slot>
        <div slot="footer">
          <slot name="footer"></slot>
        </div>
      </sl-card>
    `;
  }

  static styles = css`
    
  `;
  
}