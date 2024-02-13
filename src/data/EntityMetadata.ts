export interface IEntityProperty {
  name: string;
  type: string;
  required?: boolean;
  maxLength?: number;
  multiline?: boolean;
  label?: string;
  unique?: boolean;
  input?: string;
}

export class EntityMetadata {
  
  name: string;
  label: string;
  properties: IEntityProperty[];

  constructor(data: any) {
    this.name = data.name;
    this.label = data.label;
    
    if (Array.isArray(data.properties)) {
      this.properties = data.properties.map((prop: any) => {
        const property: any = {};
        Object.keys(prop).forEach(key => {
          property[key.toLowerCase()] = prop[key];
        });
        return property;
      });
    } else {
      this.properties = [];
    }
  }
  
  
  getProperties(key?: string) {
    if (key == null) {
      return this.properties;
    } else {
      // input 문자열을 "," 로 분리하여 배열로 만들고 key가 포함된 property만 반환합니다.
      return this.properties.filter(p => {
        if (p.input == null) {
          return false;
        }
        const inputs = p.input.split(",");
        return inputs.includes(key);
      });
    }
  }
}