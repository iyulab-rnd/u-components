import type { TemplateResult } from "lit";
import { SystemIcon } from "./UIcon.resource";

export type RenderMethod = (type: string) => Promise<TemplateResult<1>>;

export class UIconController {
  public static readonly renderers: Map<string, RenderMethod> = new Map();
  public static basePath: string = "/assets/icons";

  public static setBasePath(path: string) {
    this.basePath = path;
  }

  public static assignSystemIcon(icon: typeof SystemIcon) {
    Object.assign(SystemIcon, icon);
  }

  public static registerRenderer(type: string, render: RenderMethod) {
    if(this.renderers.has(type) || type === "default" || type === "system") {
      throw new Error(`UIconController: Render method with type "${type}" already exists`);
    } else {
      this.renderers.set(type, render);
    }
  }
  
}