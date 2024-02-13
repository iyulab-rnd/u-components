import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import './assets/themes/light.css';
import './assets/themes/dark.css';

import './index';

@customElement('u-app')
export class App extends LitElement {

  @query("u-alert")
  dialog!: any;

  render() {
    return html`
      <u-tooltip content="how about">
        <button @click=${() => this.toggleTheme()}>theme</button>
      </u-tooltip>

      <u-button>Button</u-button>
      
      <u-alert>
        This is a primary alert with a <a href="#">link</a>.
      </u-alert>
      <u-button @click=${() => this.showDialog()}>Show Dialog</u-button>
    `;
  }

  showDialog() {
    this.dialog.showAsync();
  }

  toggleTheme() {
    document.documentElement.classList.toggle('sl-theme-dark');
  }

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
    }
  `

}