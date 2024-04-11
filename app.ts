import { LitElement, css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";

import './src';
import { propertyMeta } from "./src/decorators";
import { SystemIcon } from "./src/components/icon/UIcon.resource";
import { UAlertController } from "./src/components/alert/UAlertController";

export class TestContext {

  @propertyMeta({ type:"text", label: 'Name', required: true })
  name: string = '';

  @propertyMeta({ type:"text", format:'email', label: 'Email', required: true })
  email: string = '';

  @propertyMeta({ type:"text", format:'password', label: 'Password', required: true })
  password: string = 'asdas';

  @propertyMeta({ type:"checkbox", label: '동의?' })
  agree: boolean = false;
}

@customElement('preview-app')
export class PreviewApp extends LitElement {

  @query("u-button") button!: any;
  @state() context: object = new TestContext();

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
      <u-form
        headLine="Register"
        .context=${this.context}
        .onSubmit=${() => {console.log('submit', this.context)}}
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
      position: position as any
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