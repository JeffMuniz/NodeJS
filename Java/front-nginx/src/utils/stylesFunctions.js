import { isFunction } from "lodash";

export const ifStyle = prop => (truly, falsy = null) => props =>
  props[prop] ? truly : falsy;

export const switchStyle = prop => stylesObj => props => {
  const propValue = props[prop] || "default";
  const switchObj = stylesObj[propValue];

  if (isFunction(switchObj)) {
    return switchObj(props);
  }

  return switchObj;
};
