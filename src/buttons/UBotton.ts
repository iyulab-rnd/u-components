import { css, html, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.js';

import type { 
  CommandModel, 
  UButtonTheme, 
  UButtonSize, 
  UButtonType, 
  UButtonLink 
} from './UBottonModel';

import '../tooltips';
import type { UTooltipPosition } from '../tooltips/UTooltipModel';

import '../icons';

@customElement('u-button')
export class UButton extends LitElement {

  @query("sl-button")
  button!: SlButton;

  @property({ type: String })
  type: UButtonType = 'button';

  @property({ type: String })
  theme: UButtonTheme = 'default';

  @property({ type: Boolean })
  outline: boolean = false;

  @property({ type: String })
  text?: string;

  @property({ type: String })
  size: UButtonSize = 'small';

  @property({ type: Object })
  link?: UButtonLink;

  @property({ type: Boolean })
  round: boolean = false;

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Boolean })
  loading: boolean = false;

  @property({ type: String })
  tooltip?: string;

  @property({ type: String })
  tooltipPosition: UTooltipPosition = 'top';

  @property({ attribute: false })
  onClick?: () => void;

  @property({ type: Object })
  command?: CommandModel;

  @property()
  commandParam?: any = undefined;
  
  async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);

    if (changedProperties.has('command') && this.command) {
      const command = this.command;
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

  renderButtonAndTooltip() {
    return html`
      <u-tooltip
        .content=${this.tooltip}
        .position=${this.tooltipPosition}>
        ${this.renderButton()}
      </u-tooltip>
    `;
  }

  renderButton() {
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

  renderChildren() {
    return html`
      <slot name="prefix"></slot>
      <slot name="suffix"></slot>
      ${this.text ?? html`<slot></slot>`}
    `;
  }

  private async handleButtonClick() {
    this.button.loading = true;
    
    if (this.command) {
      this.command.execute(this.commandParam);
    }
    if (this.onClick) {
      this.onClick();
    }

    this.button.loading = false;
  }

  static styles = css`
    :host {
      
    }
  `;

}