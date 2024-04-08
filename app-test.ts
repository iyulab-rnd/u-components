import { LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";

import { propertyMeta } from "./src/decorators";
import './src';
import { SystemIcon } from "./src/components/icon/UIcon.vector";
import { UAlertController } from "./src/components/alert/UAlertController";

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

  @query("u-button") button!: any;

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      ${this.renderSystemIcons()}
      ${this.buttonTest()}
      ${this.inputTest()}
      <!-- ${this.contextTest()} -->
      <!-- ${this.formTest()} -->
    `;
  }

  renderSystemIcons() {
    const icons = Object.keys(SystemIcon);
    return html`
      <h3>===== System Icons =====</h3>
      <u-divider></u-divider>
      <div class="icons">
        ${icons.map(icon => html`
          <u-icon type="system" name=${icon}></u-icon>
          <span>${icon}</span>
        `)}
      </div>
    `;
  }

  inputTest() {
    return html`
      <!-- <u-text-input
        required
        label='Name'
        description='Your name'
        placeholder='Enter your name'
      ></u-text-input>
      <u-object-input
        required
        label='Headers'
        description='Your request headers'
        placeholder='Enter your request headers'
      ></u-object-input>
      <u-editor-input
        required
        label='Body'
        description='Your request body'
      ></u-editor-input>
      <u-file-input
        required
        label='File'
        description='Your request file'
      ></u-file-input>
      <u-textarea-input
        required
        label='Description'
        description='Your description'
        placeholder='Enter your description'
      ></u-textarea-input>
      <u-number-input
        required
        label='Age'
        description='Your age'
        placeholder='Enter your age'
      ></u-number-input>
      <u-checkbox-input
        required
        label='Agree'
        description='Your agreement'
      ></u-checkbox-input>
      <u-rest-url-input
        required
        label='Request URL'
        description='Your request URL'
        placeholder='Enter your request URL'
      ></u-rest-url-input>
      <u-select-input
        label="Select"
        description="Your selection"
        placeholder="Select your option"
        .options=${['1', '2', '3', '4', '5', '6']}
      ></u-select-input>
      <u-range-input
        label="Range"
        description="Your range"
        min="0"
        max="100"
        step="5"
        value="50"
      ></u-range-input> -->
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

  buttonTest() {
    return html`
      <h3>===== Button Test =====</h3>
      <u-divider></u-divider>
      <u-button-group position="start" gap="5px">
        <u-button @click=${this.request} tooltip="hello">Render</u-button>
        <u-button @click=${this.toggleTheme}>Theme</u-button>
        <u-button @click=${() => this.toggleAlert('askdu ajd as sdckj skj aa', 'bottom-left')}>alert</u-button>
        <u-button @click=${() => this.toggleAlert('askdncsdckj skj aa', 'bottom-center')}>Theme</u-button>
        <u-button @click=${() => this.toggleAlert('askdncjdnsjcsu ajd  skj aa', 'bottom-right')}>Theme</u-button>
        <u-button @click=${() => this.toggleAlert('askdncjdnsjcsu ajd as sdckj skj aa', 'bottom')}>Theme</u-button>
        <u-button @click=${() => this.toggleAlert(' sdckj skj aa', 'bottom')}>Theme</u-button>
        <u-dropdown>
          <u-button slot="trigger" caret>Dropdown</u-button>
          ${this.renderMenu()}
        </u-dropdown>
        <div slot="collapsed">Hello</div>
      </u-button-group>
    `;
  }

  contextTest() {
    return html`
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
    `;
  }

  formTest() {
    return html`
      <h3>===== Form Test =====</h3>
      <u-divider></u-divider>
      <u-form
        label="Register"
        .context=${new TestContext()}
        .onSubmit=${() => {throw new Error('Not implemented')}}
      ></u-form>
    `;
  }

  request() {
    this.requestUpdate();
  }

  toggleTheme() {
    document.documentElement.classList.toggle('sl-theme-dark');
  }

  toggleAlert(content: string, position: string) {
    UAlertController.toastAsync({
      type: 'success',
      content: content,
      position: position
    });
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