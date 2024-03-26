
export const dateToUtcDateString = (date: Date): string => {
  const [ year, month, day ] = date.toISOString()
    .split('T')[0]
    .split('-');

  return `${year}-${month}-${day}`;
};
