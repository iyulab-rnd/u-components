import { UBaseInputModel } from "../input-parts/UBaseInput.model";

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
   * The path of the real saved file (optional).
   */
  path?: string;
}

export interface UFileInputModel extends UBaseInputModel {
  /**
   * The accept attributes of the file type.
   */
  accepts?: string[];

  /**
   * The value of the input.
   */
  value?: FileMetaValue[];
}