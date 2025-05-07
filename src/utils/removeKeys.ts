const deepCloneJSON = <T extends Record<string, any>>(obj: T): T =>
  JSON.parse(JSON.stringify(obj));

export const removeKeys = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K | K[],
): Omit<T, K> => {
  const newObj = deepCloneJSON(obj);

  const keysArray = Array.isArray(keys) ? keys : [keys];

  keysArray.forEach(key => {
    if (key in newObj) {
      delete newObj[key];
    }
  });

  return newObj;
};
