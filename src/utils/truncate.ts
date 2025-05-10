export const truncate = (str: string, maxLength = 10): string => {
  if (str.length <= maxLength) {
    return str;
  }

  return str.slice(0, maxLength) + '...';
};
