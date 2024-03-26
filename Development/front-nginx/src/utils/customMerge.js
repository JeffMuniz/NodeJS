import mergeWith from "lodash/mergeWith";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";

const chooseNotEmptyValue = (objValue, srcValue) => {
  if (!srcValue) {
    return objValue;
  }

  if (!Array.isArray(objValue) && isObject(objValue)) {
    return Object.keys(objValue).reduce(
      (obj, field) => ({
        ...obj,
        [field]: chooseNotEmptyValue(objValue[field], srcValue[field]),
      }),
      {},
    );
  }

  if (!isEmpty(srcValue) && !isEmpty(objValue)) {
    return srcValue;
  }

  return srcValue;
};

const customMerge = (oldObject, newObject) =>
  mergeWith(oldObject, newObject, chooseNotEmptyValue);

export default customMerge;
