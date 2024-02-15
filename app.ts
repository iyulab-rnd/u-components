import { LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";

import './assets/themes/light.css';
import './assets/themes/dark.css';

import './components/index';

@customElement('u-app')
export class App extends LitElement {

  @query("u-drawer")
  dialog!: any;

  render() {
    return html`
      <u-button-group>
        <u-button @click=${this.toggleTheme}>Theme</u-button>
        <u-button @click=${() => this.showDialog()}>Show Dialog</u-button>
      </u-button-group>
      <u-input
        type="date"
        required
      ></u-input>
      <u-icon name="gear"></u-icon>
    `;
  }

  async showDialog() {
    this.dialog.label = 'This is a dialog';
    const result = await this.dialog.showAsync();
    console.log(result);
  }

  toggleTheme() {
    document.documentElement.classList.toggle('sl-theme-dark');
  }

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
    }
  `;
}