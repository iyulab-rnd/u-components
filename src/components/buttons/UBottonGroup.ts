import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('u-button-group')
export class UButtonGroup extends LitElement {

  @property({ type: String })
  position: 'start' | 'center' | 'end' = 'end';

  @property({ type: String })
  gap?: string;
  
  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    
    if(changedProperties.has('position')) {
      this.style.justifyContent = this.position === 'start' ? 'flex-start' 
      : this.position === 'center' ? 'center' 
      : 'flex-end';
    }
    if(changedProperties.has('gap')) {
      this.style.gap = this.gap || '0px';
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      align-items: center;
    }
  `;

}