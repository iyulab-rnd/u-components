// const propertyKeyName = "propertyMeta";
// const propertyMetaKey = Symbol(propertyKeyName);
const objectName = "Object";
const __propertyMeta: {
  [key: string]: any;
} = {
};

// @ts-expect-error 설명: propertyMeta 충돌 문제로 은닉형식으로 사용
document.__propertyMeta__ = __propertyMeta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface PropertyMetaData<_ = unknown, TypeHint = unknown> {
  required?: boolean;
  label?: string;
  hint?: string;
  format?: string;  // button | checkbox | color | date | datetime | email | file | hidden | image | month | number | password | radio | range | reset | search | submit | tel | text | time | url | week 
  type?: TypeHint;
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
}

export function propertyMeta<T = unknown, TypeHint = unknown>(metadata: PropertyMetaData<T, TypeHint>) {
  return (target: object, propertyKey: string | symbol) => {

    const key = target.constructor.name;
    if (__propertyMeta[key] === undefined) {
      __propertyMeta[key] = {};
    }
    __propertyMeta[key][propertyKey] = metadata;
  };
}

export function getPropertyMeta(target: object, propertyKey: string | symbol): PropertyMetaData | undefined {

  const metadata: PropertyMetaData | undefined = undefined;
  // 2. Reflect 에서 메타데이터를 못가져왔을 경우 __propertyMeta 에서 가져옵니다.
  if (metadata === undefined) {
    const key = target.constructor.name;
    if (__propertyMeta[key] === undefined) {
      if (target.constructor.name === objectName) {
        return undefined;
      } else {
        return getPropertyMeta(__propertyMeta, propertyKey);
      }
    } else {
      return __propertyMeta[key][propertyKey] as PropertyMetaData;
    }
  }
  return metadata
}

// import "reflect-metadata";

// const propertyKeyName = "propertyMeta";
// const propertyMetaKey = Symbol(propertyKeyName);
// const objectName = "Object";
// const __propertyMeta: {
//   [key: string]: any;
// } = {
// };

// // @ts-expect-error 설명: propertyMeta 충돌 문제로 은닉형식으로 사용
// document.__propertyMeta__ = __propertyMeta;

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export interface PropertyMetaData<_ = unknown, TypeHint = unknown> {
//   required?: boolean;
//   label?: string;
//   hint?: string;
//   format?: string;  // button | checkbox | color | date | datetime | email | file | hidden | image | month | number | password | radio | range | reset | search | submit | tel | text | time | url | week 
//   type?: TypeHint;
//   minLength?: number;
//   maxLength?: number;
//   regex?: RegExp;
// }

// export function propertyMeta<T = unknown, TypeHint = unknown>(metadata: PropertyMetaData<T, TypeHint>) {
//   return (target: object, propertyKey: string | symbol) => {

//     try {
//       // 1. Reflect 에 메타데이터를 등록합니다.
//       Reflect.defineMetadata(propertyMetaKey, metadata, target, propertyKey);
//     } catch {
//       // 아무것도 하지 않음
//     }

//     // 2. Reflect 에 문제가 있을 경우를 대비해서 __propertyMeta 에도 등록합니다.
//     const key = target.constructor.name;
//     if (__propertyMeta[key] === undefined) {
//       __propertyMeta[key] = {};
//     }
//     __propertyMeta[key][propertyKey] = metadata;
//   };
// }

// export function getPropertyMeta(target: object, propertyKey: string | symbol): PropertyMetaData | undefined {

//   let metadata: PropertyMetaData | undefined = undefined;
//   try {
//     // 1. Reflect 에서 메타데이터를 가져옵니다.
//     metadata = Reflect.getMetadata(propertyMetaKey, target, propertyKey);
//     if (metadata) {
//       return metadata;
//     }
//   } catch {
//     // 아무것도 하지 않음
//   }

//   // 2. Reflect 에서 메타데이터를 못가져왔을 경우 __propertyMeta 에서 가져옵니다.
//   if (metadata === undefined) {
//     const key = target.constructor.name;
//     if (__propertyMeta[key] === undefined) {
//       if (target.constructor.name === objectName) {
//         return undefined;
//       } else {
//         return getPropertyMeta(__propertyMeta, propertyKey);
//       }
//     } else {
//       return __propertyMeta[key][propertyKey] as PropertyMetaData;
//     }
//   }
//   return metadata
// }