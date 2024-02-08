import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import './assets/themes/light.css';
import './assets/themes/dark.css';

import './dialogs';
import './buttons';
import './tooltips';

@customElement('u-app')
export class App extends LitElement {

  @query("u-dialog")
  dialog!: any;

  render() {
    return html`
      <u-tooltip content="how about">
        <button @click=${() => this.toggleTheme()}>theme</button>
      </u-tooltip>

      <u-button>Button</u-button>
      
      <u-dialog label="hello">
        <div>
          <h1>Dialog Content</h1>
          <p>Dialog content goes here</p>
        </div>
      </u-dialog>
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