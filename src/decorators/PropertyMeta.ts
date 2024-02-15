import 'reflect-metadata';
import { UInputMeta } from '../components/inputs/UInputModel';

const key = Symbol('propertyMeta');
type constructor = new (...args: any[]) => any;

export interface PropertyMetaData extends UInputMeta {
  
}

export function propertyMeta(metadata: PropertyMetaData) {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(key, metadata, target, propertyKey);
  };
}

export function getPropertyMeta(target: constructor, propertyKey: string): PropertyMetaData {
  return Reflect.getMetadata(key, target.prototype, propertyKey);
}