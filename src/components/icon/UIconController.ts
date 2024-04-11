import type { TemplateResult } from "lit";

export type RenderMethod = (type: string) => TemplateResult<1>;

export class UIconController {
  public static readonly renderers: Map<string, RenderMethod> = new Map();
  public static basePath: string = "icons";

  public static setBasePath(path: string) {
    this.basePath = path;
  }

  public static registerRenderer(type: string, render: RenderMethod) {
    if(this.renderers.has(type) || type === "default" || type === "system") {
      throw new Error(`UIconController: Render method with type "${type}" already exists`);
    } else {
      this.renderers.set(type, render);
    }
  }
  
}