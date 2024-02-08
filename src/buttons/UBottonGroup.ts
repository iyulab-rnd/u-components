import { html, LitElement } from 'lit'
import { customElement, query } from 'lit/decorators.js'

import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import SlButtonGroup from '@shoelace-style/shoelace/dist/components/button-group/button-group.js';

@customElement('u-button-group')
export class UButtonGroup extends LitElement {

  @query("sl-button-group")
  buttonGroup!: SlButtonGroup;
  
  render() {
    return html`
      <sl-button-group>
        <slot></slot>
      </sl-button-group>
    `;
  }

}