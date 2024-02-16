import{u as ho,f as po,T as fo,i as tt,s as Ct,x as O,e as bo,w as mo,a as go}from"./directive-helpers-D6d_88b9.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ft=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vo={attribute:!0,type:String,converter:ho,reflect:!1,hasChanged:po},yo=(t=vo,e,o)=>{const{kind:r,metadata:i}=o;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(o.name,t),r==="accessor"){const{name:s}=o;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(s,a,t)},init(l){return l!==void 0&&this.P(s,void 0,t),l}}}if(r==="setter"){const{name:s}=o;return function(l){const a=this[s];e.call(this,l),this.requestUpdate(s,a,t)}}throw Error("Unsupported decorator location: "+r)};function u(t){return(e,o)=>typeof o=="object"?yo(t,e,o):((r,i,n)=>{const s=i.hasOwnProperty(n);return i.constructor.createProperty(n,s?{...r,wrapped:!0}:r),s?Object.getOwnPropertyDescriptor(i,n):void 0})(t,e,o)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Qt(t){return u({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ce=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function H(t,e){return(o,r,i)=>{const n=s=>{var l;return((l=s.renderRoot)==null?void 0:l.querySelector(t))??null};if(e){const{get:s,set:l}=typeof r=="object"?o:i??(()=>{const a=Symbol();return{get(){return this[a]},set(c){this[a]=c}}})();return ce(o,r,{get(){let a=s.call(this);return a===void 0&&(a=n(this),(a!==null||this.hasUpdated)&&l.call(this,a)),a}})}return ce(o,r,{get(){return n(this)}})}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=t=>t??fo;var $t=tt`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,wo=tt`
  ${$t}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;const Xt=new Set,xo=new MutationObserver(qe),st=new Map;let Ue=document.documentElement.dir||"ltr",We=document.documentElement.lang||navigator.language,et;xo.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});function He(...t){t.map(e=>{const o=e.$code.toLowerCase();st.has(o)?st.set(o,Object.assign(Object.assign({},st.get(o)),e)):st.set(o,e),et||(et=e)}),qe()}function qe(){Ue=document.documentElement.dir||"ltr",We=document.documentElement.lang||navigator.language,[...Xt.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let _o=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Xt.add(this.host)}hostDisconnected(){Xt.delete(this.host)}dir(){return`${this.host.dir||Ue}`.toLowerCase()}lang(){return`${this.host.lang||We}`.toLowerCase()}getTranslationData(e){var o,r;const i=new Intl.Locale(e.replace(/_/g,"-")),n=i==null?void 0:i.language.toLowerCase(),s=(r=(o=i==null?void 0:i.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",l=st.get(`${n}-${s}`),a=st.get(n);return{locale:i,language:n,region:s,primary:l,secondary:a}}exists(e,o){var r;const{primary:i,secondary:n}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(i&&i[e]||n&&n[e]||o.includeFallback&&et&&et[e])}term(e,...o){const{primary:r,secondary:i}=this.getTranslationData(this.lang());let n;if(r&&r[e])n=r[e];else if(i&&i[e])n=i[e];else if(et&&et[e])n=et[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof n=="function"?n(...o):n}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,o)}};var Ye={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};He(Ye);var Co=Ye,te=class extends _o{};He(Co);var Xe=Object.defineProperty,$o=Object.defineProperties,ko=Object.getOwnPropertyDescriptor,Eo=Object.getOwnPropertyDescriptors,ue=Object.getOwnPropertySymbols,So=Object.prototype.hasOwnProperty,Oo=Object.prototype.propertyIsEnumerable,de=(t,e,o)=>e in t?Xe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,it=(t,e)=>{for(var o in e||(e={}))So.call(e,o)&&de(t,o,e[o]);if(ue)for(var o of ue(e))Oo.call(e,o)&&de(t,o,e[o]);return t},Nt=(t,e)=>$o(t,Eo(e)),d=(t,e,o,r)=>{for(var i=r>1?void 0:r?ko(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&Xe(e,o,i),i},q=class extends Ct{constructor(){super(),Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const o=new CustomEvent(t,it({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){const r=customElements.get(t);if(!r){customElements.define(t,class extends e{},o);return}let i=" (unknown version)",n=i;"version"in e&&e.version&&(i=" v"+e.version),"version"in r&&r.version&&(n=" v"+r.version),!(i&&n&&i===n)&&console.warn(`Attempted to register <${t}>${i}, but <${t}>${n} has already been registered.`)}};q.version="2.13.1";q.dependencies={};d([u()],q.prototype,"dir",2);d([u()],q.prototype,"lang",2);var Ke=class extends q{constructor(){super(...arguments),this.localize=new te(this)}render(){return O`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Ke.styles=wo;var mt=new WeakMap,gt=new WeakMap,vt=new WeakMap,Ut=new WeakSet,St=new WeakMap,zo=class{constructor(t,e){this.handleFormData=o=>{const r=this.options.disabled(this.host),i=this.options.name(this.host),n=this.options.value(this.host),s=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!r&&!s&&typeof i=="string"&&i.length>0&&typeof n<"u"&&(Array.isArray(n)?n.forEach(l=>{o.formData.append(i,l.toString())}):o.formData.append(i,n.toString()))},this.handleFormSubmit=o=>{var r;const i=this.options.disabled(this.host),n=this.options.reportValidity;this.form&&!this.form.noValidate&&((r=mt.get(this.form))==null||r.forEach(s=>{this.setUserInteracted(s,!0)})),this.form&&!this.form.noValidate&&!i&&!n(this.host)&&(o.preventDefault(),o.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),St.set(this.host,[])},this.handleInteraction=o=>{const r=St.get(this.host);r.includes(o.type)||r.push(o.type),r.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const o=this.form.querySelectorAll("*");for(const r of o)if(typeof r.checkValidity=="function"&&!r.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const o=this.form.querySelectorAll("*");for(const r of o)if(typeof r.reportValidity=="function"&&!r.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=it({form:o=>{const r=o.form;if(r){const n=o.getRootNode().getElementById(r);if(n)return n}return o.closest("form")},name:o=>o.name,value:o=>o.value,defaultValue:o=>o.defaultValue,disabled:o=>{var r;return(r=o.disabled)!=null?r:!1},reportValidity:o=>typeof o.reportValidity=="function"?o.reportValidity():!0,checkValidity:o=>typeof o.checkValidity=="function"?o.checkValidity():!0,setValue:(o,r)=>o.value=r,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),St.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),St.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,mt.has(this.form)?mt.get(this.form).add(this.host):mt.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),gt.has(this.form)||(gt.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),vt.has(this.form)||(vt.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const t=mt.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),gt.has(this.form)&&(this.form.reportValidity=gt.get(this.form),gt.delete(this.form)),vt.has(this.form)&&(this.form.checkValidity=vt.get(this.form),vt.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?Ut.add(t):Ut.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const o=document.createElement("button");o.type=t,o.style.position="absolute",o.style.width="0",o.style.height="0",o.style.clipPath="inset(50%)",o.style.overflow="hidden",o.style.whiteSpace="nowrap",e&&(o.name=e.name,o.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(r=>{e.hasAttribute(r)&&o.setAttribute(r,e.getAttribute(r))})),this.form.append(o),o.click(),o.remove()}}getForm(){var t;return(t=this.form)!=null?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,o=!!Ut.has(e),r=!!e.required;e.toggleAttribute("data-required",r),e.toggleAttribute("data-optional",!r),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&o),e.toggleAttribute("data-user-valid",t&&o)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t==null||t.preventDefault()}},ee=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(Nt(it({},ee),{valid:!1,valueMissing:!0}));Object.freeze(Nt(it({},ee),{valid:!1,customError:!0}));var Lo=tt`
  ${$t}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`,Po=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=o=>{const r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}},Kt="";function he(t){Kt=t}function Ao(t=""){if(!Kt){const e=[...document.getElementsByTagName("script")],o=e.find(r=>r.hasAttribute("data-shoelace"));if(o)he(o.getAttribute("data-shoelace"));else{const r=e.find(n=>/shoelace(\.min)?\.js($|\?)/.test(n.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(n.src));let i="";r&&(i=r.getAttribute("src")),he(i.split("/").slice(0,-1).join("/"))}}return Kt.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var Bo={name:"default",resolver:t=>Ao(`assets/icons/${t}.svg`)},To=Bo,pe={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},Ro={name:"system",resolver:t=>t in pe?`data:image/svg+xml,${encodeURIComponent(pe[t])}`:""},Do=Ro,Mo=[To,Do],Zt=[];function Vo(t){Zt.push(t)}function Fo(t){Zt=Zt.filter(e=>e!==t)}function fe(t){return Mo.find(e=>e.name===t)}var No=tt`
  ${$t}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function ct(t,e){const o=it({waitUntilFirstUpdate:!1},e);return(r,i)=>{const{update:n}=r,s=Array.isArray(t)?t:[t];r.update=function(l){s.forEach(a=>{const c=a;if(l.has(c)){const h=l.get(c),f=this[c];h!==f&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[i](h,f)}}),n.call(this,l)}}}var yt=Symbol(),Ot=Symbol(),Wt,Ht=new Map,j=class extends q{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var o;let r;if(e!=null&&e.spriteSheet)return O`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`;try{if(r=await fetch(t,{mode:"cors"}),!r.ok)return r.status===410?yt:Ot}catch{return Ot}try{const i=document.createElement("div");i.innerHTML=await r.text();const n=i.firstElementChild;if(((o=n==null?void 0:n.tagName)==null?void 0:o.toLowerCase())!=="svg")return yt;Wt||(Wt=new DOMParser);const l=Wt.parseFromString(n.outerHTML,"text/html").body.querySelector("svg");return l?(l.part.add("svg"),document.adoptNode(l)):yt}catch{return yt}}connectedCallback(){super.connectedCallback(),Vo(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Fo(this)}getIconSource(){const t=fe(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:o}=this.getIconSource(),r=o?fe(this.library):void 0;if(!e){this.svg=null;return}let i=Ht.get(e);if(i||(i=this.resolveIcon(e,r),Ht.set(e,i)),!this.initialRender)return;const n=await i;if(n===Ot&&Ht.delete(e),e===this.getIconSource().url){if(bo(n)){this.svg=n;return}switch(n){case Ot:case yt:this.svg=null,this.emit("sl-error");break;default:this.svg=n.cloneNode(!0),(t=r==null?void 0:r.mutator)==null||t.call(r,this.svg),this.emit("sl-load")}}}render(){return this.svg}};j.styles=No;d([Qt()],j.prototype,"svg",2);d([u({reflect:!0})],j.prototype,"name",2);d([u()],j.prototype,"src",2);d([u()],j.prototype,"label",2);d([u({reflect:!0})],j.prototype,"library",2);d([ct("label")],j.prototype,"handleLabelChange",1);d([ct(["name","src","library"])],j.prototype,"setIcon",1);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Io={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},jo=t=>(...e)=>({_$litDirective$:t,values:e});class Uo{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this._$Ct=e,this._$AM=o,this._$Ci=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rt=jo(class extends Uo{constructor(t){var e;if(super(t),t.type!==Io.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var r,i;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in e)e[n]&&!((r=this.nt)!=null&&r.has(n))&&this.st.add(n);return this.render(e)}const o=t.element.classList;for(const n of this.st)n in e||(o.remove(n),this.st.delete(n));for(const n in e){const s=!!e[n];s===this.st.has(n)||(i=this.nt)!=null&&i.has(n)||(s?(o.add(n),this.st.add(n)):(o.remove(n),this.st.delete(n)))}return mo}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ze=Symbol.for(""),Wo=t=>{if((t==null?void 0:t.r)===Ze)return t==null?void 0:t._$litStatic$},be=(t,...e)=>({_$litStatic$:e.reduce((o,r,i)=>o+(n=>{if(n._$litStatic$!==void 0)return n._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${n}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[i+1],t[0]),r:Ze}),me=new Map,Ho=t=>(e,...o)=>{const r=o.length;let i,n;const s=[],l=[];let a,c=0,h=!1;for(;c<r;){for(a=e[c];c<r&&(n=o[c],(i=Wo(n))!==void 0);)a+=i+e[++c],h=!0;c!==r&&l.push(n),s.push(a),c++}if(c===r&&s.push(e[r]),h){const f=s.join("$$lit$$");(e=me.get(f))===void 0&&(s.raw=s,me.set(f,e=s)),o=l}return t(e,...o)},qt=Ho(go);var x=class extends q{constructor(){super(...arguments),this.formControlController=new zo(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Po(this,"[default]","prefix","suffix"),this.localize=new te(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:ee}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?be`a`:be`button`;return qt`
      <${e}
        part="base"
        class=${Rt({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${B(t?void 0:this.disabled)}
        type=${B(t?void 0:this.type)}
        title=${this.title}
        name=${B(t?void 0:this.name)}
        value=${B(t?void 0:this.value)}
        href=${B(t?this.href:void 0)}
        target=${B(t?this.target:void 0)}
        download=${B(t?this.download:void 0)}
        rel=${B(t?this.rel:void 0)}
        role=${B(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?qt` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?qt`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};x.styles=Lo;x.dependencies={"sl-icon":j,"sl-spinner":Ke};d([H(".button")],x.prototype,"button",2);d([Qt()],x.prototype,"hasFocus",2);d([Qt()],x.prototype,"invalid",2);d([u()],x.prototype,"title",2);d([u({reflect:!0})],x.prototype,"variant",2);d([u({reflect:!0})],x.prototype,"size",2);d([u({type:Boolean,reflect:!0})],x.prototype,"caret",2);d([u({type:Boolean,reflect:!0})],x.prototype,"disabled",2);d([u({type:Boolean,reflect:!0})],x.prototype,"loading",2);d([u({type:Boolean,reflect:!0})],x.prototype,"outline",2);d([u({type:Boolean,reflect:!0})],x.prototype,"pill",2);d([u({type:Boolean,reflect:!0})],x.prototype,"circle",2);d([u()],x.prototype,"type",2);d([u()],x.prototype,"name",2);d([u()],x.prototype,"value",2);d([u()],x.prototype,"href",2);d([u()],x.prototype,"target",2);d([u()],x.prototype,"rel",2);d([u()],x.prototype,"download",2);d([u()],x.prototype,"form",2);d([u({attribute:"formaction"})],x.prototype,"formAction",2);d([u({attribute:"formenctype"})],x.prototype,"formEnctype",2);d([u({attribute:"formmethod"})],x.prototype,"formMethod",2);d([u({attribute:"formnovalidate",type:Boolean})],x.prototype,"formNoValidate",2);d([u({attribute:"formtarget"})],x.prototype,"formTarget",2);d([ct("disabled",{waitUntilFirstUpdate:!0})],x.prototype,"handleDisabledChange",1);x.define("sl-button");var qo=tt`
  ${$t}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,Yo=tt`
  ${$t}

  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const K=Math.min,T=Math.max,Dt=Math.round,zt=Math.floor,Z=t=>({x:t,y:t}),Xo={left:"right",right:"left",bottom:"top",top:"bottom"},Ko={start:"end",end:"start"};function Gt(t,e,o){return T(t,K(e,o))}function ut(t,e){return typeof t=="function"?t(e):t}function G(t){return t.split("-")[0]}function dt(t){return t.split("-")[1]}function Ge(t){return t==="x"?"y":"x"}function oe(t){return t==="y"?"height":"width"}function kt(t){return["top","bottom"].includes(G(t))?"y":"x"}function re(t){return Ge(kt(t))}function Zo(t,e,o){o===void 0&&(o=!1);const r=dt(t),i=re(t),n=oe(i);let s=i==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[n]>e.floating[n]&&(s=Mt(s)),[s,Mt(s)]}function Go(t){const e=Mt(t);return[Jt(t),e,Jt(e)]}function Jt(t){return t.replace(/start|end/g,e=>Ko[e])}function Jo(t,e,o){const r=["left","right"],i=["right","left"],n=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return o?e?i:r:e?r:i;case"left":case"right":return e?n:s;default:return[]}}function Qo(t,e,o,r){const i=dt(t);let n=Jo(G(t),o==="start",r);return i&&(n=n.map(s=>s+"-"+i),e&&(n=n.concat(n.map(Jt)))),n}function Mt(t){return t.replace(/left|right|bottom|top/g,e=>Xo[e])}function tr(t){return{top:0,right:0,bottom:0,left:0,...t}}function Je(t){return typeof t!="number"?tr(t):{top:t,right:t,bottom:t,left:t}}function Vt(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function ge(t,e,o){let{reference:r,floating:i}=t;const n=kt(e),s=re(e),l=oe(s),a=G(e),c=n==="y",h=r.x+r.width/2-i.width/2,f=r.y+r.height/2-i.height/2,m=r[l]/2-i[l]/2;let p;switch(a){case"top":p={x:h,y:r.y-i.height};break;case"bottom":p={x:h,y:r.y+r.height};break;case"right":p={x:r.x+r.width,y:f};break;case"left":p={x:r.x-i.width,y:f};break;default:p={x:r.x,y:r.y}}switch(dt(e)){case"start":p[s]-=m*(o&&c?-1:1);break;case"end":p[s]+=m*(o&&c?-1:1);break}return p}const er=async(t,e,o)=>{const{placement:r="bottom",strategy:i="absolute",middleware:n=[],platform:s}=o,l=n.filter(Boolean),a=await(s.isRTL==null?void 0:s.isRTL(e));let c=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:h,y:f}=ge(c,r,a),m=r,p={},b=0;for(let g=0;g<l.length;g++){const{name:w,fn:v}=l[g],{x:y,y:_,data:E,reset:$}=await v({x:h,y:f,initialPlacement:r,placement:m,strategy:i,middlewareData:p,rects:c,platform:s,elements:{reference:t,floating:e}});h=y??h,f=_??f,p={...p,[w]:{...p[w],...E}},$&&b<=50&&(b++,typeof $=="object"&&($.placement&&(m=$.placement),$.rects&&(c=$.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:i}):$.rects),{x:h,y:f}=ge(c,m,a)),g=-1)}return{x:h,y:f,placement:m,strategy:i,middlewareData:p}};async function ie(t,e){var o;e===void 0&&(e={});const{x:r,y:i,platform:n,rects:s,elements:l,strategy:a}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:f="floating",altBoundary:m=!1,padding:p=0}=ut(e,t),b=Je(p),w=l[m?f==="floating"?"reference":"floating":f],v=Vt(await n.getClippingRect({element:(o=await(n.isElement==null?void 0:n.isElement(w)))==null||o?w:w.contextElement||await(n.getDocumentElement==null?void 0:n.getDocumentElement(l.floating)),boundary:c,rootBoundary:h,strategy:a})),y=f==="floating"?{...s.floating,x:r,y:i}:s.reference,_=await(n.getOffsetParent==null?void 0:n.getOffsetParent(l.floating)),E=await(n.isElement==null?void 0:n.isElement(_))?await(n.getScale==null?void 0:n.getScale(_))||{x:1,y:1}:{x:1,y:1},$=Vt(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:y,offsetParent:_,strategy:a}):y);return{top:(v.top-$.top+b.top)/E.y,bottom:($.bottom-v.bottom+b.bottom)/E.y,left:(v.left-$.left+b.left)/E.x,right:($.right-v.right+b.right)/E.x}}const or=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:r,placement:i,rects:n,platform:s,elements:l,middlewareData:a}=e,{element:c,padding:h=0}=ut(t,e)||{};if(c==null)return{};const f=Je(h),m={x:o,y:r},p=re(i),b=oe(p),g=await s.getDimensions(c),w=p==="y",v=w?"top":"left",y=w?"bottom":"right",_=w?"clientHeight":"clientWidth",E=n.reference[b]+n.reference[p]-m[p]-n.floating[b],$=m[p]-n.reference[p],k=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c));let P=k?k[_]:0;(!P||!await(s.isElement==null?void 0:s.isElement(k)))&&(P=l.floating[_]||n.floating[b]);const V=E/2-$/2,X=P/2-g[b]/2-1,pt=K(f[v],X),ft=K(f[y],X),D=pt,bt=P-g[b]-ft,A=P/2-g[b]/2+V,F=Gt(D,A,bt),N=!a.arrow&&dt(i)!=null&&A!==F&&n.reference[b]/2-(A<D?pt:ft)-g[b]/2<0,U=N?A<D?A-D:A-bt:0;return{[p]:m[p]+U,data:{[p]:F,centerOffset:A-F-U,...N&&{alignmentOffset:U}},reset:N}}}),rr=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,r;const{placement:i,middlewareData:n,rects:s,initialPlacement:l,platform:a,elements:c}=e,{mainAxis:h=!0,crossAxis:f=!0,fallbackPlacements:m,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:g=!0,...w}=ut(t,e);if((o=n.arrow)!=null&&o.alignmentOffset)return{};const v=G(i),y=G(l)===l,_=await(a.isRTL==null?void 0:a.isRTL(c.floating)),E=m||(y||!g?[Mt(l)]:Go(l));!m&&b!=="none"&&E.push(...Qo(l,g,b,_));const $=[l,...E],k=await ie(e,w),P=[];let V=((r=n.flip)==null?void 0:r.overflows)||[];if(h&&P.push(k[v]),f){const D=Zo(i,s,_);P.push(k[D[0]],k[D[1]])}if(V=[...V,{placement:i,overflows:P}],!P.every(D=>D<=0)){var X,pt;const D=(((X=n.flip)==null?void 0:X.index)||0)+1,bt=$[D];if(bt)return{data:{index:D,overflows:V},reset:{placement:bt}};let A=(pt=V.filter(F=>F.overflows[0]<=0).sort((F,N)=>F.overflows[1]-N.overflows[1])[0])==null?void 0:pt.placement;if(!A)switch(p){case"bestFit":{var ft;const F=(ft=V.map(N=>[N.placement,N.overflows.filter(U=>U>0).reduce((U,uo)=>U+uo,0)]).sort((N,U)=>N[1]-U[1])[0])==null?void 0:ft[0];F&&(A=F);break}case"initialPlacement":A=l;break}if(i!==A)return{reset:{placement:A}}}return{}}}};async function ir(t,e){const{placement:o,platform:r,elements:i}=t,n=await(r.isRTL==null?void 0:r.isRTL(i.floating)),s=G(o),l=dt(o),a=kt(o)==="y",c=["left","top"].includes(s)?-1:1,h=n&&a?-1:1,f=ut(e,t);let{mainAxis:m,crossAxis:p,alignmentAxis:b}=typeof f=="number"?{mainAxis:f,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...f};return l&&typeof b=="number"&&(p=l==="end"?b*-1:b),a?{x:p*h,y:m*c}:{x:m*c,y:p*h}}const nr=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,r;const{x:i,y:n,placement:s,middlewareData:l}=e,a=await ir(e,t);return s===((o=l.offset)==null?void 0:o.placement)&&(r=l.arrow)!=null&&r.alignmentOffset?{}:{x:i+a.x,y:n+a.y,data:{...a,placement:s}}}}},sr=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:r,placement:i}=e,{mainAxis:n=!0,crossAxis:s=!1,limiter:l={fn:w=>{let{x:v,y}=w;return{x:v,y}}},...a}=ut(t,e),c={x:o,y:r},h=await ie(e,a),f=kt(G(i)),m=Ge(f);let p=c[m],b=c[f];if(n){const w=m==="y"?"top":"left",v=m==="y"?"bottom":"right",y=p+h[w],_=p-h[v];p=Gt(y,p,_)}if(s){const w=f==="y"?"top":"left",v=f==="y"?"bottom":"right",y=b+h[w],_=b-h[v];b=Gt(y,b,_)}const g=l.fn({...e,[m]:p,[f]:b});return{...g,data:{x:g.x-o,y:g.y-r}}}}},ar=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){const{placement:o,rects:r,platform:i,elements:n}=e,{apply:s=()=>{},...l}=ut(t,e),a=await ie(e,l),c=G(o),h=dt(o),f=kt(o)==="y",{width:m,height:p}=r.floating;let b,g;c==="top"||c==="bottom"?(b=c,g=h===(await(i.isRTL==null?void 0:i.isRTL(n.floating))?"start":"end")?"left":"right"):(g=c,b=h==="end"?"top":"bottom");const w=p-a[b],v=m-a[g],y=!e.middlewareData.shift;let _=w,E=v;if(f){const k=m-a.left-a.right;E=h||y?K(v,k):k}else{const k=p-a.top-a.bottom;_=h||y?K(w,k):k}if(y&&!h){const k=T(a.left,0),P=T(a.right,0),V=T(a.top,0),X=T(a.bottom,0);f?E=m-2*(k!==0||P!==0?k+P:T(a.left,a.right)):_=p-2*(V!==0||X!==0?V+X:T(a.top,a.bottom))}await s({...e,availableWidth:E,availableHeight:_});const $=await i.getDimensions(n.floating);return m!==$.width||p!==$.height?{reset:{rects:!0}}:{}}}};function J(t){return Qe(t)?(t.nodeName||"").toLowerCase():"#document"}function R(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Y(t){var e;return(e=(Qe(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Qe(t){return t instanceof Node||t instanceof R(t).Node}function W(t){return t instanceof Element||t instanceof R(t).Element}function I(t){return t instanceof HTMLElement||t instanceof R(t).HTMLElement}function ve(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof R(t).ShadowRoot}function Et(t){const{overflow:e,overflowX:o,overflowY:r,display:i}=M(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+o)&&!["inline","contents"].includes(i)}function lr(t){return["table","td","th"].includes(J(t))}function ne(t){const e=se(),o=M(t);return o.transform!=="none"||o.perspective!=="none"||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||["transform","perspective","filter"].some(r=>(o.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(o.contain||"").includes(r))}function to(t){let e=lt(t);for(;I(e)&&!It(e);){if(ne(e))return e;e=lt(e)}return null}function se(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function It(t){return["html","body","#document"].includes(J(t))}function M(t){return R(t).getComputedStyle(t)}function jt(t){return W(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function lt(t){if(J(t)==="html")return t;const e=t.assignedSlot||t.parentNode||ve(t)&&t.host||Y(t);return ve(e)?e.host:e}function eo(t){const e=lt(t);return It(e)?t.ownerDocument?t.ownerDocument.body:t.body:I(e)&&Et(e)?e:eo(e)}function xt(t,e,o){var r;e===void 0&&(e=[]),o===void 0&&(o=!0);const i=eo(t),n=i===((r=t.ownerDocument)==null?void 0:r.body),s=R(i);return n?e.concat(s,s.visualViewport||[],Et(i)?i:[],s.frameElement&&o?xt(s.frameElement):[]):e.concat(i,xt(i,[],o))}function oo(t){const e=M(t);let o=parseFloat(e.width)||0,r=parseFloat(e.height)||0;const i=I(t),n=i?t.offsetWidth:o,s=i?t.offsetHeight:r,l=Dt(o)!==n||Dt(r)!==s;return l&&(o=n,r=s),{width:o,height:r,$:l}}function ae(t){return W(t)?t:t.contextElement}function at(t){const e=ae(t);if(!I(e))return Z(1);const o=e.getBoundingClientRect(),{width:r,height:i,$:n}=oo(e);let s=(n?Dt(o.width):o.width)/r,l=(n?Dt(o.height):o.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!l||!Number.isFinite(l))&&(l=1),{x:s,y:l}}const cr=Z(0);function ro(t){const e=R(t);return!se()||!e.visualViewport?cr:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function ur(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==R(t)?!1:e}function ot(t,e,o,r){e===void 0&&(e=!1),o===void 0&&(o=!1);const i=t.getBoundingClientRect(),n=ae(t);let s=Z(1);e&&(r?W(r)&&(s=at(r)):s=at(t));const l=ur(n,o,r)?ro(n):Z(0);let a=(i.left+l.x)/s.x,c=(i.top+l.y)/s.y,h=i.width/s.x,f=i.height/s.y;if(n){const m=R(n),p=r&&W(r)?R(r):r;let b=m.frameElement;for(;b&&r&&p!==m;){const g=at(b),w=b.getBoundingClientRect(),v=M(b),y=w.left+(b.clientLeft+parseFloat(v.paddingLeft))*g.x,_=w.top+(b.clientTop+parseFloat(v.paddingTop))*g.y;a*=g.x,c*=g.y,h*=g.x,f*=g.y,a+=y,c+=_,b=R(b).frameElement}}return Vt({width:h,height:f,x:a,y:c})}const dr=[":popover-open",":modal"];function io(t){let e=!1,o=0,r=0;function i(n){try{e=e||t.matches(n)}catch{}}if(dr.forEach(n=>{i(n)}),e){const n=to(t);if(n){const s=n.getBoundingClientRect();o=s.x,r=s.y}}return[e,o,r]}function hr(t){let{elements:e,rect:o,offsetParent:r,strategy:i}=t;const n=Y(r),[s]=e?io(e.floating):[!1];if(r===n||s)return o;let l={scrollLeft:0,scrollTop:0},a=Z(1);const c=Z(0),h=I(r);if((h||!h&&i!=="fixed")&&((J(r)!=="body"||Et(n))&&(l=jt(r)),I(r))){const f=ot(r);a=at(r),c.x=f.x+r.clientLeft,c.y=f.y+r.clientTop}return{width:o.width*a.x,height:o.height*a.y,x:o.x*a.x-l.scrollLeft*a.x+c.x,y:o.y*a.y-l.scrollTop*a.y+c.y}}function pr(t){return Array.from(t.getClientRects())}function no(t){return ot(Y(t)).left+jt(t).scrollLeft}function fr(t){const e=Y(t),o=jt(t),r=t.ownerDocument.body,i=T(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),n=T(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight);let s=-o.scrollLeft+no(t);const l=-o.scrollTop;return M(r).direction==="rtl"&&(s+=T(e.clientWidth,r.clientWidth)-i),{width:i,height:n,x:s,y:l}}function br(t,e){const o=R(t),r=Y(t),i=o.visualViewport;let n=r.clientWidth,s=r.clientHeight,l=0,a=0;if(i){n=i.width,s=i.height;const c=se();(!c||c&&e==="fixed")&&(l=i.offsetLeft,a=i.offsetTop)}return{width:n,height:s,x:l,y:a}}function mr(t,e){const o=ot(t,!0,e==="fixed"),r=o.top+t.clientTop,i=o.left+t.clientLeft,n=I(t)?at(t):Z(1),s=t.clientWidth*n.x,l=t.clientHeight*n.y,a=i*n.x,c=r*n.y;return{width:s,height:l,x:a,y:c}}function ye(t,e,o){let r;if(e==="viewport")r=br(t,o);else if(e==="document")r=fr(Y(t));else if(W(e))r=mr(e,o);else{const i=ro(t);r={...e,x:e.x-i.x,y:e.y-i.y}}return Vt(r)}function so(t,e){const o=lt(t);return o===e||!W(o)||It(o)?!1:M(o).position==="fixed"||so(o,e)}function gr(t,e){const o=e.get(t);if(o)return o;let r=xt(t,[],!1).filter(l=>W(l)&&J(l)!=="body"),i=null;const n=M(t).position==="fixed";let s=n?lt(t):t;for(;W(s)&&!It(s);){const l=M(s),a=ne(s);!a&&l.position==="fixed"&&(i=null),(n?!a&&!i:!a&&l.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||Et(s)&&!a&&so(t,s))?r=r.filter(h=>h!==s):i=l,s=lt(s)}return e.set(t,r),r}function vr(t){let{element:e,boundary:o,rootBoundary:r,strategy:i}=t;const s=[...o==="clippingAncestors"?gr(e,this._c):[].concat(o),r],l=s[0],a=s.reduce((c,h)=>{const f=ye(e,h,i);return c.top=T(f.top,c.top),c.right=K(f.right,c.right),c.bottom=K(f.bottom,c.bottom),c.left=T(f.left,c.left),c},ye(e,l,i));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function yr(t){const{width:e,height:o}=oo(t);return{width:e,height:o}}function wr(t,e,o,r){const i=I(e),n=Y(e),s=o==="fixed",l=ot(t,!0,s,e);let a={scrollLeft:0,scrollTop:0};const c=Z(0);if(i||!i&&!s)if((J(e)!=="body"||Et(n))&&(a=jt(e)),i){const g=ot(e,!0,s,e);c.x=g.x+e.clientLeft,c.y=g.y+e.clientTop}else n&&(c.x=no(n));let h=l.left+a.scrollLeft-c.x,f=l.top+a.scrollTop-c.y;const[m,p,b]=io(r);return m&&(h+=p,f+=b,i&&(h+=e.clientLeft,f+=e.clientTop)),{x:h,y:f,width:l.width,height:l.height}}function we(t,e){return!I(t)||M(t).position==="fixed"?null:e?e(t):t.offsetParent}function ao(t,e){const o=R(t);if(!I(t))return o;let r=we(t,e);for(;r&&lr(r)&&M(r).position==="static";)r=we(r,e);return r&&(J(r)==="html"||J(r)==="body"&&M(r).position==="static"&&!ne(r))?o:r||to(t)||o}const xr=async function(t){const e=this.getOffsetParent||ao,o=this.getDimensions;return{reference:wr(t.reference,await e(t.floating),t.strategy,t.floating),floating:{x:0,y:0,...await o(t.floating)}}};function _r(t){return M(t).direction==="rtl"}const Tt={convertOffsetParentRelativeRectToViewportRelativeRect:hr,getDocumentElement:Y,getClippingRect:vr,getOffsetParent:ao,getElementRects:xr,getClientRects:pr,getDimensions:yr,getScale:at,isElement:W,isRTL:_r};function Cr(t,e){let o=null,r;const i=Y(t);function n(){var l;clearTimeout(r),(l=o)==null||l.disconnect(),o=null}function s(l,a){l===void 0&&(l=!1),a===void 0&&(a=1),n();const{left:c,top:h,width:f,height:m}=t.getBoundingClientRect();if(l||e(),!f||!m)return;const p=zt(h),b=zt(i.clientWidth-(c+f)),g=zt(i.clientHeight-(h+m)),w=zt(c),y={rootMargin:-p+"px "+-b+"px "+-g+"px "+-w+"px",threshold:T(0,K(1,a))||1};let _=!0;function E($){const k=$[0].intersectionRatio;if(k!==a){if(!_)return s();k?s(!1,k):r=setTimeout(()=>{s(!1,1e-7)},100)}_=!1}try{o=new IntersectionObserver(E,{...y,root:i.ownerDocument})}catch{o=new IntersectionObserver(E,y)}o.observe(t)}return s(!0),n}function $r(t,e,o,r){r===void 0&&(r={});const{ancestorScroll:i=!0,ancestorResize:n=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:a=!1}=r,c=ae(t),h=i||n?[...c?xt(c):[],...xt(e)]:[];h.forEach(v=>{i&&v.addEventListener("scroll",o,{passive:!0}),n&&v.addEventListener("resize",o)});const f=c&&l?Cr(c,o):null;let m=-1,p=null;s&&(p=new ResizeObserver(v=>{let[y]=v;y&&y.target===c&&p&&(p.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var _;(_=p)==null||_.observe(e)})),o()}),c&&!a&&p.observe(c),p.observe(e));let b,g=a?ot(t):null;a&&w();function w(){const v=ot(t);g&&(v.x!==g.x||v.y!==g.y||v.width!==g.width||v.height!==g.height)&&o(),g=v,b=requestAnimationFrame(w)}return o(),()=>{var v;h.forEach(y=>{i&&y.removeEventListener("scroll",o),n&&y.removeEventListener("resize",o)}),f==null||f(),(v=p)==null||v.disconnect(),p=null,a&&cancelAnimationFrame(b)}}const kr=sr,Er=rr,xe=ar,Sr=or,Or=(t,e,o)=>{const r=new Map,i={platform:Tt,...o},n={...i.platform,_c:r};return er(t,e,{...i,platform:n})};function zr(t){return Lr(t)}function Yt(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Lr(t){for(let e=t;e;e=Yt(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Yt(t);e;e=Yt(e)){if(!(e instanceof Element))continue;const o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||o.filter!=="none"||e.tagName==="BODY"))return e}return null}function Pr(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t}var C=class extends q{constructor(){super(...arguments),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom");let r=0,i=0,n=0,s=0,l=0,a=0,c=0,h=0;o?t.top<e.top?(r=t.left,i=t.bottom,n=t.right,s=t.bottom,l=e.left,a=e.top,c=e.right,h=e.top):(r=e.left,i=e.bottom,n=e.right,s=e.bottom,l=t.left,a=t.top,c=t.right,h=t.top):t.left<e.left?(r=t.right,i=t.top,n=e.left,s=e.top,l=t.right,a=t.bottom,c=e.left,h=e.bottom):(r=e.right,i=e.top,n=t.left,s=t.top,l=e.right,a=e.bottom,c=t.left,h=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||Pr(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&(this.cleanup=$r(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[nr({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(xe({apply:({rects:o})=>{const r=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${o.reference.width}px`:"",this.popup.style.height=i?`${o.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Er({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(kr({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(xe({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:o,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${o}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Sr({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?o=>Tt.getOffsetParent(o,zr):Tt.getOffsetParent;Or(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:Nt(it({},Tt),{getOffsetParent:e})}).then(({x:o,y:r,middlewareData:i,placement:n})=>{const s=getComputedStyle(this).direction==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[n.split("-")[0]];if(this.setAttribute("data-current-placement",n),Object.assign(this.popup.style,{left:`${o}px`,top:`${r}px`}),this.arrow){const a=i.arrow.x,c=i.arrow.y;let h="",f="",m="",p="";if(this.arrowPlacement==="start"){const b=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",f=s?b:"",p=s?"":b}else if(this.arrowPlacement==="end"){const b=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=s?"":b,p=s?b:"",m=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(p=typeof a=="number"?"calc(50% - var(--arrow-size-diagonal))":"",h=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(p=typeof a=="number"?`${a}px`:"",h=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:h,right:f,bottom:m,left:p,[l]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return O`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Rt({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${Rt({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?O`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};C.styles=Yo;d([H(".popup")],C.prototype,"popup",2);d([H(".popup__arrow")],C.prototype,"arrowEl",2);d([u()],C.prototype,"anchor",2);d([u({type:Boolean,reflect:!0})],C.prototype,"active",2);d([u({reflect:!0})],C.prototype,"placement",2);d([u({reflect:!0})],C.prototype,"strategy",2);d([u({type:Number})],C.prototype,"distance",2);d([u({type:Number})],C.prototype,"skidding",2);d([u({type:Boolean})],C.prototype,"arrow",2);d([u({attribute:"arrow-placement"})],C.prototype,"arrowPlacement",2);d([u({attribute:"arrow-padding",type:Number})],C.prototype,"arrowPadding",2);d([u({type:Boolean})],C.prototype,"flip",2);d([u({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],C.prototype,"flipFallbackPlacements",2);d([u({attribute:"flip-fallback-strategy"})],C.prototype,"flipFallbackStrategy",2);d([u({type:Object})],C.prototype,"flipBoundary",2);d([u({attribute:"flip-padding",type:Number})],C.prototype,"flipPadding",2);d([u({type:Boolean})],C.prototype,"shift",2);d([u({type:Object})],C.prototype,"shiftBoundary",2);d([u({attribute:"shift-padding",type:Number})],C.prototype,"shiftPadding",2);d([u({attribute:"auto-size"})],C.prototype,"autoSize",2);d([u()],C.prototype,"sync",2);d([u({type:Object})],C.prototype,"autoSizeBoundary",2);d([u({attribute:"auto-size-padding",type:Number})],C.prototype,"autoSizePadding",2);d([u({attribute:"hover-bridge",type:Boolean})],C.prototype,"hoverBridge",2);var lo=new Map,Ar=new WeakMap;function Br(t){return t??{keyframes:[],options:{duration:0}}}function _e(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function co(t,e){lo.set(t,Br(e))}function Ce(t,e,o){const r=Ar.get(t);if(r!=null&&r[e])return _e(r[e],o.dir);const i=lo.get(e);return i?_e(i,o.dir):{keyframes:[],options:{duration:0}}}function $e(t,e){return new Promise(o=>{function r(i){i.target===t&&(t.removeEventListener(e,r),o())}t.addEventListener(e,r)})}function ke(t,e,o){return new Promise(r=>{if((o==null?void 0:o.duration)===1/0)throw new Error("Promise-based animations must be finite.");const i=t.animate(e,Nt(it({},o),{duration:Tr()?0:o.duration}));i.addEventListener("cancel",r,{once:!0}),i.addEventListener("finish",r,{once:!0})})}function Ee(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?parseFloat(t)*1e3:parseFloat(t)}function Tr(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Se(t){return Promise.all(t.getAnimations().map(e=>new Promise(o=>{e.cancel(),requestAnimationFrame(o)})))}var z=class extends q{constructor(){super(),this.localize=new te(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=Ee(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=Ee(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await Se(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:o,options:r}=Ce(this,"tooltip.show",{dir:this.localize.dir()});await ke(this.popup.popup,o,r),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await Se(this.body);const{keyframes:o,options:r}=Ce(this,"tooltip.hide",{dir:this.localize.dir()});await ke(this.popup.popup,o,r),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,$e(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,$e(this,"sl-after-hide")}render(){return O`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${Rt({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};z.styles=qo;z.dependencies={"sl-popup":C};d([H("slot:not([name])")],z.prototype,"defaultSlot",2);d([H(".tooltip__body")],z.prototype,"body",2);d([H("sl-popup")],z.prototype,"popup",2);d([u()],z.prototype,"content",2);d([u()],z.prototype,"placement",2);d([u({type:Boolean,reflect:!0})],z.prototype,"disabled",2);d([u({type:Number})],z.prototype,"distance",2);d([u({type:Boolean,reflect:!0})],z.prototype,"open",2);d([u({type:Number})],z.prototype,"skidding",2);d([u()],z.prototype,"trigger",2);d([u({type:Boolean})],z.prototype,"hoist",2);d([ct("open",{waitUntilFirstUpdate:!0})],z.prototype,"handleOpenChange",1);d([ct(["content","distance","hoist","placement","skidding"])],z.prototype,"handleOptionsChange",1);d([ct("disabled")],z.prototype,"handleDisabledChange",1);co("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});co("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});z.define("sl-tooltip");var Rr=Object.defineProperty,Dr=Object.getOwnPropertyDescriptor,nt=(t,e,o,r)=>{for(var i=r>1?void 0:r?Dr(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&Rr(e,o,i),i};let Q=class extends Ct{constructor(){super(...arguments),this.position="top",this.arrow=!1}async update(t){super.update(t),await this.updateComplete,t.has("maxWidth")&&this.tooltip.style.setProperty("--max-width",`${this.maxWidth}px`),t.has("arrow")&&this.tooltip.style.setProperty("--sl-tooltip-arrow-size",`${this.arrow?"6px":"0"}`)}render(){return O`
      <sl-tooltip 
        ?hoist=${!0}  
        .position=${this.position}
        distance=${B(this.distance)}
      >
        ${this.renderContent()}
        <slot></slot>
      </sl-tooltip>
    `}renderContent(){return this.content?O`<span slot="content">${this.content}</span>`:O`<slot slot="content" name="content"></slot>`}};nt([H("sl-tooltip")],Q.prototype,"tooltip",2);nt([u({type:String})],Q.prototype,"content",2);nt([u({type:String})],Q.prototype,"position",2);nt([u({type:Boolean})],Q.prototype,"arrow",2);nt([u({type:Number})],Q.prototype,"distance",2);nt([u({type:Number})],Q.prototype,"maxWidth",2);Q=nt([Ft("u-tooltip")],Q);j.define("sl-icon");var Mr=Object.defineProperty,Vr=Object.getOwnPropertyDescriptor,ht=(t,e,o,r)=>{for(var i=r>1?void 0:r?Vr(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&Mr(e,o,i),i};let rt=class extends Ct{async updated(t){super.updated(t),await this.updateComplete,t.has("color")&&this.color&&(this.icon.style.color=this.color),t.has("size")&&this.size&&(this.icon.style.fontSize=`${this.size}px`)}render(){return O`
      <sl-icon 
        .name=${this.name}
        .src=${this.src}
      ></sl-icon>
    `}};ht([H("sl-icon")],rt.prototype,"icon",2);ht([u({type:String})],rt.prototype,"name",2);ht([u({type:String})],rt.prototype,"src",2);ht([u({type:Number})],rt.prototype,"size",2);ht([u({type:String})],rt.prototype,"color",2);rt=ht([Ft("u-icon")],rt);var Fr=Object.defineProperty,Nr=Object.getOwnPropertyDescriptor,L=(t,e,o,r)=>{for(var i=r>1?void 0:r?Nr(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&Fr(e,o,i),i};let S=class extends Ct{constructor(){super(...arguments),this.type="button",this.theme="default",this.outline=!1,this.size="small",this.round=!1,this.disabled=!1,this.loading=!1,this.tooltipPosition="top"}async updated(t){super.updated(t),await this.updateComplete,t.has("command")&&this.command&&(this.disabled=!this.command.canExecute(this.commandParam))}render(){return this.tooltip?O`
        ${this.renderButtonAndTooltip()}
      `:O`
        ${this.renderButton()}
      `}renderButtonAndTooltip(){return O`
      <u-tooltip
        .content=${this.tooltip}
        .position=${this.tooltipPosition}>
        ${this.renderButton()}
      </u-tooltip>
    `}renderButton(){var r,i,n;if(this.type==="link"&&!this.link)throw new Error("Link type button must have a link property set.");const t=(r=this.link)==null?void 0:r.href,e=(i=this.link)==null?void 0:i.target,o=(n=this.link)==null?void 0:n.download;return O`
      <sl-button
        type="button"
        .variant=${this.theme}
        .size=${this.size}
        ?pill=${this.round}
        ?caret=${this.type==="dropdown"}
        ?disabled=${this.disabled}
        ?loading=${this.loading}
        ?outline=${this.outline}
        href=${B(t)}
        target=${B(e)}
        download=${B(o)}
        @click=${()=>this.handleButtonClick()}
      >
        ${this.renderChildren()}
      </sl-button>
    `}renderChildren(){return O`
      <slot name="prefix"></slot>
      <slot name="suffix"></slot>
      ${this.text??O`<slot></slot>`}
    `}async handleButtonClick(){this.command&&(this.button.loading=!0,this.command.execute(this.commandParam),this.button.loading=!1),this.onClick&&(this.button.loading=!0,await this.onClick(),this.button.loading=!1)}};S.styles=tt`

  `;L([H("sl-button")],S.prototype,"button",2);L([u({type:String})],S.prototype,"type",2);L([u({type:String})],S.prototype,"theme",2);L([u({type:Boolean})],S.prototype,"outline",2);L([u({type:String})],S.prototype,"text",2);L([u({type:String})],S.prototype,"size",2);L([u({type:Object})],S.prototype,"link",2);L([u({type:Boolean})],S.prototype,"round",2);L([u({type:Boolean})],S.prototype,"disabled",2);L([u({type:Boolean})],S.prototype,"loading",2);L([u({type:String})],S.prototype,"tooltip",2);L([u({type:String})],S.prototype,"tooltipPosition",2);L([u({attribute:!1})],S.prototype,"onClick",2);L([u({type:Object})],S.prototype,"command",2);L([u()],S.prototype,"commandParam",2);S=L([Ft("u-button")],S);var Ir=Object.defineProperty,jr=Object.getOwnPropertyDescriptor,le=(t,e,o,r)=>{for(var i=r>1?void 0:r?jr(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&Ir(e,o,i),i};let _t=class extends Ct{constructor(){super(...arguments),this.position="end"}async updated(t){super.updated(t),await this.updateComplete,t.has("position")&&(this.style.justifyContent=this.position==="start"?"flex-start":this.position==="center"?"center":"flex-end"),t.has("gap")&&(this.style.gap=this.gap||"0px")}render(){return O`
      <slot></slot>
    `}};_t.styles=tt`
    :host {
      display: flex;
      align-items: center;
    }
  `;le([u({type:String})],_t.prototype,"position",2);le([u({type:String})],_t.prototype,"gap",2);_t=le([Ft("u-button-group")],_t);const wt=t=>O`
    <u-button
      type='button'
      size=${t.size}
      theme=${t.theme}
      tooltip=${t.tooltip||""}
      tooltipPosition=${t.tooltipPosition}
      ?round=${t.round}
      ?outline=${t.outline}
      ?loading=${t.loading}
      ?disabled=${t.disabled}
    >Hello World!</u-button>
  `,Hr={title:"Example/Button",tags:["autodocs"],render:t=>wt(t),argTypes:{size:{control:{type:"select"},options:["small","medium","large"]},theme:{control:{type:"select"},options:["default","primary","success","neutral","warning","danger","text"]},tooltip:{control:{type:"text"}},tooltipPosition:{control:{type:"select"},options:["top","right","bottom","left"]},round:{control:{type:"boolean"}},outline:{control:{type:"boolean"}},loading:{control:{type:"boolean"}},disabled:{control:{type:"boolean"}}},args:{size:"medium",theme:"default",tooltip:"Hello",tooltipPosition:"top",round:!1,outline:!1,loading:!1,disabled:!1}},Lt={args:{round:!0}},Pt={args:{outline:!0}},At={args:{loading:!0}},Bt={args:{disabled:!0}};var Oe,ze,Le;wt.parameters={...wt.parameters,docs:{...(Oe=wt.parameters)==null?void 0:Oe.docs,source:{originalSource:`(props: UButton) => {
  return html\`
    <u-button
      type='button'
      size=\${props.size}
      theme=\${props.theme}
      tooltip=\${props.tooltip || ''}
      tooltipPosition=\${props.tooltipPosition}
      ?round=\${props.round}
      ?outline=\${props.outline}
      ?loading=\${props.loading}
      ?disabled=\${props.disabled}
    >Hello World!</u-button>
  \`;
}`,...(Le=(ze=wt.parameters)==null?void 0:ze.docs)==null?void 0:Le.source}}};var Pe,Ae,Be;Lt.parameters={...Lt.parameters,docs:{...(Pe=Lt.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    round: true
  }
}`,...(Be=(Ae=Lt.parameters)==null?void 0:Ae.docs)==null?void 0:Be.source}}};var Te,Re,De;Pt.parameters={...Pt.parameters,docs:{...(Te=Pt.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  args: {
    outline: true
  }
}`,...(De=(Re=Pt.parameters)==null?void 0:Re.docs)==null?void 0:De.source}}};var Me,Ve,Fe;At.parameters={...At.parameters,docs:{...(Me=At.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...(Fe=(Ve=At.parameters)==null?void 0:Ve.docs)==null?void 0:Fe.source}}};var Ne,Ie,je;Bt.parameters={...Bt.parameters,docs:{...(Ne=Bt.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(je=(Ie=Bt.parameters)==null?void 0:Ie.docs)==null?void 0:je.source}}};const qr=["Button","Round","Outline","Loading","Disable"];export{wt as Button,Bt as Disable,At as Loading,Pt as Outline,Lt as Round,qr as __namedExportsOrder,Hr as default};
