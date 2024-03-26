export const removeDuplicated = (list, filterBy) =>
  list.reduce((unique, current) => {
    if (!unique.some(un => un[filterBy] === current[filterBy])) {
      unique.push(current);
    }
    return unique;
  }, []);
