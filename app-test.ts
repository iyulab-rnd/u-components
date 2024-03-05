import { LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
setBasePath('src');

import './src/assets/themes/light.css';
import './src/assets/themes/dark.css';

import { propertyMeta } from "./src/decorators";
import './src/components';

export class TestContext {

  @propertyMeta({ label: 'Name', required: true })
  name: string = '';

  @propertyMeta({ type:"email", label: 'Email', required: true })
  email: string = '';

  @propertyMeta({ type:"password", label: 'Password', required: true })
  password: string = '';

  @propertyMeta({ type:"password", label: 'Confirm Password', required: true })
  confirmPassword: string = '';
}

@customElement('u-app-test')
export class AppTest extends LitElement {

  @query("u-button")
  dialog!: any;

  render() {
    return html`
      <h3>===== Button Test =====</h3>
      <u-divider></u-divider>
      <u-button @click=${this.showDialog}>Render</u-button>
      <u-button @click=${this.toggleTheme}>Theme</u-button>
      <u-dropdown>
        <u-button slot="trigger" caret>Dropdown</u-button>
        ${this.renderMenu()}
      </u-dropdown>

      <h3>===== Context Menu Test =====</h3>
      <u-divider></u-divider>
      <div class="canvas">
        <div class="inside">
          Inside
          <u-context>
            ${this.renderMenu()}
          </u-context>
        </div>
      </div>

      <h3>===== Form Test =====</h3>
      <u-divider></u-divider>
      <u-form
        label="Register"
        .context=${new TestContext()}
        .onSubmit=${() => {throw new Error('Not implemented')}}
      ></u-form>
    `;
  }

  renderMenu() {
    return html`
      <u-menu>
        <u-menu-item>Copy</u-menu-item>
        <u-menu-item>Paste</u-menu-item>
        <u-menu-divider></u-menu-divider>
        <u-menu-item>
          Save
          <u-menu slot="submenu">
            <u-menu-item>Save As...</u-menu-item>
            <u-menu-item>Export PDF</u-menu-item>
          </u-menu>
        </u-menu-item>
      </u-menu>
    `;
  }

  async showDialog() {
    this.requestUpdate();
    // this.dialog.label = 'This is a dialog';
    // const result = await this.dialog.showAsync();
    // console.log(result);
  }

  toggleTheme() {
    document.documentElement.classList.toggle('sl-theme-dark');
  }

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
    }

    .canvas {
      width: 100%;
      height: 200px;

      .inside {
        width: 50%;
        height: 100%;
        background-color: #f0f0f0;
      }
    }
  `;
}