//import { DI } from "../core/DI";
//import { ODataClient } from "../services/api/ODataClient";
import { EntityMetadata } from "./EntityMetadata";
import { EntityFieldUtils, IEntityField, IEntityHandler } from "./IEntityHandler";
import { IResultValue } from "./IResultValue";

export interface IODataEntityHandlerProps {
  url: string;
  resourceName: string;
  data?: any;
}

export class ODataEntityHandler implements IEntityHandler {
  url: string;
  resourceName: string;

  label?: string | undefined;
  fields?: IEntityField[] | PromiseLike<IEntityField[]>;
  data?: any;

  entityMeta: EntityMetadata | null = null;
  readyTask: Promise<any> | null = null;

  constructor(props: IODataEntityHandlerProps) {
    this.url = props.url;
    this.resourceName = props.resourceName;
    this.data = props.data;

    this.readyAsync();
  }

  async readyAsync() {
    if (this.readyTask) return this.readyTask;

    // this.readyTask = (async () => {
    //   const client = DI.get(ODataClient);
    //   this.entityMeta = await client.getEntityMetadataAsync(
    //     this.url,
    //     this.resourceName
    //   );
    //   // console.log(this.entityMeta.label);
    //   this.label ??= this.entityMeta.label;
    // })();

    return this.readyTask;
  }

  async getInputFieldsAsync(key: string = 'default') {
    await this.readyAsync();

    if (this.entityMeta) {
      const properties = this.entityMeta.getProperties(key);
      console.log(properties);
      return EntityFieldUtils.convertPropertiesToFields(properties);
    } else {
      return [];
    }
  }

  saveAsync(): Promise<IResultValue> {
    // const client = DI.get(ODataClient);
    // return client.saveAsync(this.url, this.resourceName, this.data);
  }

  validate(): { success: boolean; errors: string[] } {
    if (this.data == null) {
      return { success: false, errors: ["데이터가 없습니다."] };
    } else if (this.fields && Array.isArray(this.fields)) {
      const errors: string[] = [];
      this.fields.forEach((f: IEntityField) => this.validateField(f, errors));

      if (errors.length > 0) {
        return { success: false, errors };
      }
    }

    return { success: true, errors: [] };
  }

  validateField(field: IEntityField, errors: string[]) {
    const value = this.data[field.name];

    if (field.required && (value == null || value == "")) {
      errors.push(`${field.label} 필드는 필수입니다.`);
    }

    if (field.type == "text" && field.format == "email") {
      const email = value;
      if (email && !this.validateEmail(email)) {
        errors.push(`${field.label} 필드가 이메일 형식이 아닙니다.`);
      }
    }

    if (field.type == "text" && field.format == "tel") {
      const tel = value;
      if (tel && !this.validateTel(tel)) {
        errors.push(`${field.label} 필드가 전화번호 형식이 아닙니다.`);
      }
    }

    if (field.type == "text" && field.format == "url") {
      const url = value;
      if (url && !this.validateUrl(url)) {
        errors.push(`${field.label} 필드가 URL 형식이 아닙니다.`);
      }
    }

    if (field.type == "text" && field.format == "password") {
      const password = value;
      if (password && password.length < 4) {
        errors.push(`${field.label} 필드는 4자 이상이어야 합니다.`);
      } else if (password && this.validatePassword(password)) {
        errors.push(`${field.label} 필드가 약한 비밀번호입니다.`);
      }
    }
  }

  validateEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }  
  
  validateTel(tel: string): boolean {
    // 숫자, -, +, (, ) 만 입력 가능
    const re = /^[\d\-+()]*$/;
    return re.test(String(tel).toLowerCase());
  }
  
  validateUrl(url: string): boolean {
    const re =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    return re.test(String(url).toLowerCase());
  }
  
  validatePassword(password: string): boolean {
    // 숫자, 영문자, 특수문자(!@#$%^&*()-_=+) 만 입력 가능
    const re = /^[\w!@#$%^&*()-_=+]*$/;
    return re.test(String(password).toLowerCase());
  }
}