import { UBaseInputModel } from "./UBaseInput.model";

export interface FileMetaValue {
  type: string;
  name: string;
  size: number;
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