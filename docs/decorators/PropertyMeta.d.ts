import { UInputMeta } from '../components/inputs/UInputModel';
type constructor<T = {}> = new (...args: any[]) => T;
export interface PropertyMetaData extends UInputMeta {
    name?: string;
}
/**
 * 클래스 속성을 정의하기 위한 데코레이터 함수입니다.
 * @param metadata - 클래스 속성에 대한 메타데이터입니다.
 */
export declare function propertyMeta(metadata: PropertyMetaData): (target: any, propertyKey: string) => void;
/**
 * target 클래스의 모든 속성에 대한 메타데이터를 반환합니다.
 * @param target - 클래스의 생성자 함수입니다.
 * @return 모든 메타데이터의 배열을 반환합니다.
 */
export declare function getPropertyMeta(target: constructor): PropertyMetaData[] | undefined;
/**
 * target 클래스의 특정속성에 대한 메타데이터를 반환합니다.
 * @param target - 클래스의 생성자 함수입니다.
 * @param propertyKey - 메타데이터를 검색할 속성의 이름입니다.
 * @returns 특정 속성에 대한 메타데이터를 반환합니다.
 */
export declare function getPropertyMeta(target: constructor, propertyKey: string): PropertyMetaData | undefined;
export {};
