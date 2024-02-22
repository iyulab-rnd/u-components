import { css, html, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js';

import SlButton from '@shoelace-style/shoelace/dist/components/button/button.component.js';
import SlIconButton from '@shoelace-style/shoelace/dist/components/icon-button/icon-button.component.js';
SlButton.define('sl-button');
SlIconButton.define('sl-icon-button');

import type {
  UButtonTheme, 
  UButtonSize, 
  UButtonType, 
  UButtonLink,
  UButtonTarget
} from './UBottonModel';
import type {
  UTooltipPosition 
} from '../tooltip/UTooltipModel';
import type {
  CommandModel
} from '../../patterns/CommandPattern';

import '../tooltip';

@customElement('u-button')
export class UButton extends LitElement {

  @query("sl-button") button?: SlButton;

  @property({ type: String }) type: UButtonType = 'button';
  @property({ type: String }) theme: UButtonTheme = 'default';
  @property({ type: Boolean }) outline: boolean = false;
  @property({ type: String }) text?: string;
  @property({ type: String }) size: UButtonSize = 'small';
  @property({ type: Object }) link?: UButtonLink;
  @property({ type: String }) href?: string;
  @property({ type: String }) target?: UButtonTarget;
  @property({ type: String }) download?: string;
  @property({ type: Boolean }) round: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: String }) icon?: string;
  @property({ type: Boolean }) caret?: boolean = false;
  @property({ type: String }) tooltip?: string;
  @property({ type: String }) tooltipPosition: UTooltipPosition = 'top';
  @property({ attribute: false }) onAction?: () => Promise<void>;
  @property({ type: Object }) command?: CommandModel;
  @property() commandParam?: any;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('command') && this.command) {
      this.disabled = !this.command.canExecute(this.commandParam);
    }

    if (changedProperties.has('link') && this.link) {
      this.href = this.link.href;
      this.target = this.link.target;
      this.download = this.link.download;
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
    if (this.type === 'icon') {
      return this.renderIconButton();
    } else {
      return this.renderTextButton();
    }
  }

  private renderTextButton() {
    return html`
      <sl-button
        type="button"
        .variant=${this.theme}
        .size=${this.size}
        ?pill=${this.round}
        ?caret=${this.caret}
        ?disabled=${this.disabled}
        ?loading=${this.loading}
        ?outline=${this.outline}
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        download=${ifDefined(this.download)}
        @click=${this.handleButtonClick}
      >
        ${this.renderChildren()}
      </sl-button>
    `;
  }

  private renderIconButton() {
    return html`
      <sl-icon-button
        .name=${this.icon}
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        download=${ifDefined(this.download)}
        ?disabled=${this.disabled}
        @click=${this.handleButtonClick}
      ></sl-icon-button>
    `;
  }

  private renderChildren() {
    return html`
      <slot slot="prefix" name="prefix"></slot>
      ${this.text ?? html`<slot></slot>`}
      <slot slot="suffix" name="suffix"></slot>
    `;
  }

  private async handleButtonClick() {
    try {
      if (this.command && this.command.canExecute(this.commandParam)) {
        if(this.button) this.button.loading = true;
        this.command.execute(this.commandParam);
      }
      if (this.onAction) {
        if(this.button) this.button.loading = true;
        await this.onAction();
      }
    } catch (error) {
      /* istanbul ignore next */
    } finally {
      if(this.button) this.button.loading = false;
    }
  }

  static styles = css`
    sl-icon-button::part(base) {
      padding: var(--sl-spacing-2x-small);
    }
  `;

}