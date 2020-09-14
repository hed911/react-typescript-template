export const updateObject = (oldObject: Object, updatedValues: Object): any => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};
