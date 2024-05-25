
import clone from 'clone';
import { default as fastCompare } from 'react-fast-compare';

export const deepClone = <TType>(obj: TType): TType => {
  return clone(obj);
};

export const isEqual = (prev: any, next: any): boolean => {
  return fastCompare(prev, next);
};
