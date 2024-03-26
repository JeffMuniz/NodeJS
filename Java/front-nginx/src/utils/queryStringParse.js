import { some, isEmpty } from "lodash";

const hasEmptyValue = pairs => some(pairs, isEmpty);

const queryStringParse = query => {
  if (!query || query[0] !== "?") return null;
  const queryPairs = query.slice(1).split("&");
  const result = {};

  if (queryPairs) {
    queryPairs.forEach(pair => {
      const pairs = pair.split("=");

      if (!hasEmptyValue(pairs)) {
        result[pairs[0]] = decodeURIComponent(pairs[1]);
      }
    });
  }

  return !isEmpty(result) ? JSON.parse(JSON.stringify(result)) : null;
};

export default queryStringParse;
