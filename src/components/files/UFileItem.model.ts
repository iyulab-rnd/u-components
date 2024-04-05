/**
 * Represents the metadata of a file.
 */
export interface FileMetaValue {
  /**
   * The type of the file.
   */
  type: string;
  /**
   * The name of the file.
   */
  name: string;
  /**
   * The size of the file in bytes.
   */
  size: number;
  /**
   * The saved path of the file (optional).
   */
  path?: string;
}

/**
 * Represents a file item in the UFileItem component.
 */
export interface UFileItemModel {
  /**
   * The type of the file.
   */
  type?: string;

  /**
   * The name of the file.
   */
  name?: string;

  /**
   * The size of the file in bytes.
   */
  size?: number;

  /**
   * The File meta data.
   */
  value?: FileMetaValue;

  /** Below properties using when file upload **/

  /**
   * The File object representing the file.
   */
  file?: File;

  /**
   * The progress of the file upload.
   */
  hideButton?: boolean;
}