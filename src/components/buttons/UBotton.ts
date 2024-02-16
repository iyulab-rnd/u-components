import { css, html, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.js';

import type {  
  UButtonTheme, 
  UButtonSize, 
  UButtonType, 
  UButtonLink 
} from './UBottonModel';
import type {
  UTooltipPosition 
} from '../tooltips/UTooltipModel';
import type { 
  CommandModel 
} from '../../patterns/CommandPattern';

import '../tooltips';
import '../icons';

@customElement('u-button')
export class UButton extends LitElement {

  @query("sl-button") button!: SlButton;

  @property({ type: String }) type: UButtonType = 'button';
  @property({ type: String }) theme: UButtonTheme = 'default';
  @property({ type: Boolean }) outline: boolean = false;
  @property({ type: String }) text?: string;
  @property({ type: String }) size: UButtonSize = 'small';
  @property({ type: Object }) link?: UButtonLink;
  @property({ type: Boolean }) round: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: String }) tooltip?: string;
  @property({ type: String }) tooltipPosition: UTooltipPosition = 'top';
  @property({ attribute: false }) onClick?: () => Promise<void>;
  @property({ type: Object }) command?: CommandModel;
  @property() commandParam?: any;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('command') && this.command) {
      this.disabled = !this.command.canExecute(this.commandParam);
    }
  }

  render() {
    if (this.tooltip) {
      return html`
        ${this.renderButtonAndTooltip()}
      `;
    } else {
      return html`
        ${this.renderButton()}
      `;
    }
  }

  private renderButtonAndTooltip() {
    return html`
      <u-tooltip
        .content=${this.tooltip}
        .position=${this.tooltipPosition}>
        ${this.renderButton()}
      </u-tooltip>
    `;
  }

  private renderButton() {
    if(this.type === 'link' && !this.link) {
      throw new Error('Link type button must have a link property set.');
    }
    const href = this.link?.href;
    const target = this.link?.target;
    const download = this.link?.download;

    return html`
      <sl-button
        type="button"
        .variant=${this.theme}
        .size=${this.size}
        ?pill=${this.round}
        ?caret=${this.type === 'dropdown'}
        ?disabled=${this.disabled}
        ?loading=${this.loading}
        ?outline=${this.outline}
        href=${ifDefined(href)}
        target=${ifDefined(target)}
        download=${ifDefined(download)}
        @click=${() => this.handleButtonClick()}
      >
        ${this.renderChildren()}
      </sl-button>
    `;
  }

  private renderChildren() {
    return html`
      <slot name="prefix"></slot>
      <slot name="suffix"></slot>
      ${this.text ?? html`<slot></slot>`}
    `;
  }

  private async handleButtonClick() {
    if (this.command) {
      this.button.loading = true;
      this.command.execute(this.commandParam);
      this.button.loading = false;
    }
    if (this.onClick) {
      this.button.loading = true;
      await this.onClick();
      this.button.loading = false;
    }
  }

  static styles = css`

  `;

}