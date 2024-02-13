// import { InputTypes } from "../components/lit";
import { IEntityProperty } from "./EntityMetadata";
import { IResultValue } from "./IResultValue";

export interface IEntityField {
  name: string;
  label?: string;
  type?: string | InputTypes;
  format?: string;
  hint?: string;
  required?: boolean;
  maxLength?: number;
  multiline?: boolean;
}

export interface IEntityHandler {
  data?: any;
  label?: string;

  readyAsync(): Promise<any>;
  getInputFieldsAsync(key?: string): Promise<IEntityField[]>;
  validate(): IResultValue;
  saveAsync(): Promise<IResultValue>;
}

// function getInputType(field: IEntityField): InputTypes {
//   if (field.type == null) return InputTypes.text;
//   else if (field.type in InputTypes) return field.type as InputTypes;
//   else if (field.type == "bool") return InputTypes.checkbox;
//   else if (field.type == "number") return InputTypes.number;
//   else if (field.type == "date") return InputTypes.date;
//   else if (field.type == "time") return InputTypes.time;
//   else if (field.type == "datetime") return InputTypes.datetime;
//   else if (field.type == "text") {
//     if (field.format == "email") return InputTypes.email;
//     else if (field.format == "tel") return InputTypes.tel;
//     else if (field.format == "url") return InputTypes.url;
//     else if (field.format == "password") return InputTypes.password;
//     else return InputTypes.text;
//   } else {
//     return InputTypes.text;
//   }
// }

function getInputFormat(field: IEntityField): string | undefined {
  return field.format;
}

function convertPropertiesToFields(properties: IEntityProperty[]) {
  return properties.map(convertFieldByProperty);
}

function convertFieldByProperty(p: IEntityProperty): IEntityField {
  // const inputType = getInputTypeByEntityProperty(p);
  const field: IEntityField = {
    ...p
  };

  if (field.label == null) {
    field.label = p.name;
  }
  // field.type = InputTypes[inputType];
  
  return field;
}

// function getInputTypeByEntityProperty(p: IEntityProperty): InputTypes {
//   const type = p.type.toLowerCase(); // .NET 타입을 소문자로 변환
//   switch (type) {
//     case "string":
//       return InputTypes.text;
//     case "email":
//     case "emailaddress":
//       return InputTypes.email;
//     case "password":
//       return InputTypes.password;
//     case "phone":
//     case "phonenumber":
//       return InputTypes.tel;
//     case "url":
//       return InputTypes.url;
//     case "bool":
//     case "boolean":
//       return InputTypes.checkbox;
//     case "int":
//     case "integer":
//     case "float":
//     case "double":
//     case "decimal":
//       return InputTypes.number;
//     case "datetime":
//       return InputTypes.datetime;
//     case "date":
//       return InputTypes.date;
//     case "time":
//       return InputTypes.time;
//     default:
//       return InputTypes.text; // 기본값
//   }
// }

export const EntityFieldUtils = {
  // getInputType,
  getInputFormat,
  convertPropertiesToFields,
  convertFieldByProperty,
  // getInputTypeByEntityProperty,
}