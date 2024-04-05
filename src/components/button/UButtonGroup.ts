import { css, html, LitElement } from 'lit'
import { customElement, property, queryAssignedElements, state } from 'lit/decorators.js'

import { 
  UButtonGroupModel, 
  type GroupOrientation, 
  type GroupPosition 
} from './UButtonGroup.model';

@customElement('u-button-group')
export class UButtonGroup extends LitElement implements UButtonGroupModel {
  private readonly observer = new ResizeObserver(() => {
    this.checkOverflow();
  });

  @queryAssignedElements() buttons!: HTMLElement[];

  @state() collapsed: boolean = false;
  @state() initialSize?: number;

  @property({ type: String, reflect: true }) orientation: GroupOrientation = 'horizontal';
  @property({ type: String, reflect: true }) position: GroupPosition = 'end';
  @property({ type: String, reflect: true }) gap: string = '5px';
  
  connectedCallback() {
    super.connectedCallback();
    this.observer.observe(this);
  }

  disconnectedCallback() {
    this.observer.disconnect();
    super.disconnectedCallback();
  }

  protected async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    await this.updateComplete;

    this.initialize();
  }

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if(changedProperties.has('gap')) {
      this.style.gap = this.gap || '0px';
    }
  }

  render() {
    if(this.collapsed) {
      return html`<slot name="collapsed"></slot>`;
    } else {
      return html`<slot></slot>`;
    }
  }

  private initialize () {
    if(this.orientation === 'horizontal') {
      this.buttons.map(button => console.log(button.clientWidth));
      this.initialSize = this.buttons.reduce((acc, button) => acc + button.clientWidth, 0);
      console.log(this.initialSize);
    } else {
      this.initialSize = this.buttons.reduce((acc, button) => acc + button.clientHeight, 0);
    }
  }

  private checkOverflow() {
    if(!this.initialSize) return;
    if(this.orientation === 'horizontal') {
      console.log(this.scrollWidth, this.initialSize);
      // this.collapsed = this.scrollWidth > this.initialSize;
    } else {
      console.log(this.scrollHeight, this.initialSize);
      // this.collapsed = this.scrollHeight > this.initialSize;
    }
  }

  static styles = css`
    :host {
      width: auto;
      height: auto;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    :host([orientation="vertical"]) {
      flex-direction: column;
    }
    :host([orientation="horizontal"]) {
      flex-direction: row;
    }
    :host([position="start"]) {
      justify-content: flex-start;
    }
    :host([position="center"]) {
      justify-content: center;
    }
    :host([position="end"]) {
      justify-content: flex-end;
    }
  `;

}