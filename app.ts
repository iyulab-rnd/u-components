import { LitElement, css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";

import './src';
import { propertyMeta } from "./src/decorators";
import { SystemIcon } from "./src/components/icon/UIcon.resource";
import { UAlertController } from "./src/components/alert/UAlertController";
import { getLocale, t, setLocale, init } from "./src/localization";

export class T {
  @propertyMeta({ type:"text", label:"테스트1" })
  테스트1: string = '';
}

export class TA extends T {
  @propertyMeta({ type:"text", label:"테스트2" })
  테스트2: number = 0;
}

export class TB extends T {
  @propertyMeta({ type:"text", label:"테스트3" })
  테스트3: string = '';
}

export class TAA extends TA {
  @propertyMeta({ type:"text", label:"테스트4" })
  테스트4: string = '';
}

@customElement('preview-app')
export class PreviewApp extends LitElement {

  @query("u-button") button!: any;
  @state() context: object = new TAA();

  connectedCallback() {
    super.connectedCallback();
    init();
  }

  render() {
    return html`
      <!-- <u-button
        @click=${() => {
          setLocale(getLocale() === 'en' ? 'ko' : 'en');
        }}
      >
        Change Language
      </u-button>
      <h1>i18next:</h1>
      ${t('bye')} -->

      <!-- ${this.wizardTest()} -->
      <!-- ${this.renderSystemIcons()} -->
      <!-- ${this.buttonTest()} -->
      <!-- ${this.inputTest()} -->
      <!-- ${this.contextTest()} -->
      ${this.formTest()}
    `;
  }

  wizardTest() {
    return html`
      <u-wizard>
        <u-wizard-step content="step1">Step1</u-wizard-step>
        <u-wizard-step content="step2">Step2</u-wizard-step>
        <u-wizard-step content="step3">Step3</u-wizard-step>
        <u-wizard-content name="step1">Step1</u-wizard-content>
        <u-wizard-content name="step2">Step2</u-wizard-content>
        <u-wizard-content name="step3">Step3</u-wizard-content>
      </u-wizard>
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
        @submit=${(e: any) => {
          const target = e.target as any;
          target.loading = true;
          setTimeout(() => {
            target.loading = false;
          }, 1000);
          console.log('submit', this.context)
        }}
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
        .context=${this.context}
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
