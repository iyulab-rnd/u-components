import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { convertReact } from "../../utils";
import SlSkeleton from "@shoelace-style/shoelace/dist/components/skeleton/skeleton.component.js";
SlSkeleton.define('sl-skeleton');
import type { USkeletonModel, SkeletonEffect } from "./USkeleton.model";

@customElement('u-skeleton')
export class USkeletonElement extends LitElement implements USkeletonModel {
  
  @property({ type: String }) effect: SkeletonEffect = "none";
  @property({ type: String }) width?: string;
  @property({ type: String }) height?: string;

  render() {
    return html`
      <sl-skeleton
        effect=${this.effect}
        style=${this.getStyle()}
      ></sl-skeleton>
    `;
  }

  private getStyle(): string {
    let style = '';
    if (this.width) style += `width: ${this.width};`;
    if (this.height) style += `height: ${this.height};`;
    return style;
  }
}

export const USkeleton = convertReact({
  elementClass: USkeletonElement,
  tagName: 'u-skeleton',
});