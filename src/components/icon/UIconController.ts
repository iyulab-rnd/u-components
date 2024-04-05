import type { TemplateResult } from "lit";

export type RenderMethod = (type: string) => TemplateResult<1>;

export class UIconController {
  public static readonly iconRenderers: Map<string, RenderMethod> = new Map();
  public static iconBasePath: string = "assets/icons";

  public static setIconBasePath(path: string) {
    this.iconBasePath = path;
  }

  public static registerIconRenderer(type: string, render: RenderMethod) {
    if(this.iconRenderers.has(type)) {
      throw new Error(`UIconController: Render method with type "${type}" already exists`);
    } else {
      this.iconRenderers.set(type, render);
    }
  }
}