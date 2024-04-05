export type EditorTheme = "light" | "dark";

/**
 * Represents the model for the Monaco Editor.
 */
export interface MonacoEditorModel {
  /**
   * Specifies whether the header should be displayed or not.
   * @default false
   */
  noHeader: boolean;

  /**
   * The label for the editor.
   * @default "Editor"
   */
  label: string;

  /**
   * The theme to be applied to the editor.
   * @default "light"
   */
  theme: EditorTheme;

  /**
   * Specifies whether the editor is read-only or not.
   * @default false
   */
  readOnly: boolean;

  /**
   * The specific language for the editor.
   * @default "json"
   */
  language: string;

  /**
   * The font size for the editor.
   * @default 14
   */
  fontSize: number;

  /**
   * The value for the editor.
   * @default ""
   */
  value: string;
}