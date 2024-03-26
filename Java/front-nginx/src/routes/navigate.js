import isEmpty from "lodash/isEmpty";
import { WebPaths, NAVIGATION_TYPE } from "./consts";

const getCleanPath = path => !isEmpty(path) && path.split("/:")[0];
const getParams = params => {
  if (isEmpty(params)) return "";
  const values = Object.values(params);
  return values.map(value => `/${value}`).join("");
};

const navigate = (navigator, { route, data, type, params }, injection) => {
  const dependencies = { WebPaths, NAVIGATION_TYPE, ...injection };
  if (type === dependencies.NAVIGATION_TYPE.BACK) {
    navigator.goBack();
    return;
  }

  const pathname = `${getCleanPath(dependencies.WebPaths[route])}${getParams(
    params,
  )}`;

  navigator.push({
    pathname,
    state: data,
  });
};

export default navigate;
