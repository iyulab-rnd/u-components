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
      <u-form
        label="Register"
        .context=${new TestContext()}
        .onSubmit=${() => {throw new Error('Not implemented')}}
      ></u-form>
      <u-button @click=${this.showDialog}>Trick</u-button>
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
  `;
}