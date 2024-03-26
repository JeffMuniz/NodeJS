const OBJECT = "[object Object]";
const ARRAY = "[object Array]";
const getTypeOf = param => Object.prototype.toString.call(param);
const isObject = param => getTypeOf(param) === OBJECT;
export const isArray = param => getTypeOf(param) === ARRAY;

export const removeEmptyValues = obj => {
  const newObj = {};
  if (!isObject(obj)) return newObj;

  Object.keys(obj).forEach(key => {
    if (obj[key] !== "") {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};
