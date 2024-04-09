import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import SlDropdown from "@shoelace-style/shoelace/dist/components/dropdown/dropdown.component.js";
SlDropdown.define('sl-dropdown');

import { UDropdownModel, type DropdownPlacement } from "./UDropdown.model";

@customElement("u-dropdown")
export class UDropdown extends LitElement implements UDropdownModel {

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) hoist: boolean = false;
  @property({ type: String }) placement: DropdownPlacement = 'bottom-start';
  @property({ type: Number }) distance: number = 5;
  @property({ type: Number }) skidding: number = 0;

  render() {
    return html`
      <sl-dropdown
        ?open=${this.open}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        @sl-show=${() => this.open = true}
        @sl-hide=${() => this.open = false}
      >
        <slot name="trigger" slot="trigger"></slot>
        <slot @click=${() => this.open = false}></slot>
      </sl-dropdown>
    `;
  }

  public toggle() {
    this.open = !this.open;
  }
  
}