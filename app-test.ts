import { LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
setBasePath('src');

import './src/assets/themes/light.css';
import './src/assets/themes/dark.css';

import './src/components';

@customElement('u-app-test')
export class AppTest extends LitElement {

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
      <u-radio
        label="Hello"
        value="1"
        size="medium"
        required
        help="This is a help text"
        .list=${[
          { value: '1', display: 'Option 1' },
          { value: '2', display: 'Option 2' },
          { value: '3', display: 'Option 3', disabled: true }
        ]}
      ></u-radio>
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