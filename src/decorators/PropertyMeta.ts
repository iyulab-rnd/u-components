import 'reflect-metadata';
import { PropertyMetaData } from './PropertyMeta.model';

type Constructor<T = {}> = new (...args: any[]) => T; // eslint-disable-line

const propertyMetaKey = Symbol('propertyMeta');

/**
 * 클래스 속성을 정의하기 위한 데코레이터 함수입니다.
 * @param metadata - 클래스 속성에 대한 메타데이터입니다.
 */
export function propertyMeta(metadata: PropertyMetaData) {
  return (target: any, propertyKey: string) => {
    setPropertyMeta(target, propertyKey, metadata);
  };
}

/**
 * target 클래스의 모든 속성에 대한 메타데이터를 설정합니다.
 * @param target - 클래스의 생성자 함수입니다.
 * @param propertyKey - 메타데이터를 설정할 속성의 이름입니다.
 * @param metadata - 속성에 대한 메타데이터입니다.
 */
export function setPropertyMeta(target: any, propertyKey: string, metadata: PropertyMetaData): void {
  const metaList: PropertyMetaData[] = Reflect.getMetadata(propertyMetaKey, target) || [];
  metaList.push({ name: propertyKey, ...metadata });
  Reflect.defineMetadata(propertyMetaKey, metaList, target);
}

/**
 * target 클래스의 모든 속성에 대한 메타데이터를 반환합니다.
 * @param target - 클래스의 생성자 함수입니다.
 * @return 모든 메타데이터의 배열을 반환합니다.
 */
export function getPropertyMeta(target: Constructor): PropertyMetaData[] | undefined;
/**
 * target 클래스의 특정속성에 대한 메타데이터를 반환합니다.
 * @param target - 클래스의 생성자 함수입니다.
 * @param propertyKey - 메타데이터를 검색할 속성의 이름입니다.
 * @returns 특정 속성에 대한 메타데이터를 반환합니다.
 */
export function getPropertyMeta(target: Constructor, propertyKey: string): PropertyMetaData | undefined;

export function getPropertyMeta(target: Constructor, propertyKey?: string): PropertyMetaData[] | PropertyMetaData | undefined {
  try{
    target = target.prototype ? target.prototype : target;
    const metaList: PropertyMetaData[] | undefined = Reflect.getMetadata(propertyMetaKey, target);
    // propertyKey가 존재하면 해당 속성에 대한 메타데이터를 반환합니다.
    return propertyKey 
    ? metaList?.find((meta: PropertyMetaData) => meta.name === propertyKey) 
    : metaList;
  } catch (e) {
    return undefined;
  }
}