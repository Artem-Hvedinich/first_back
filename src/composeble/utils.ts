export const deleteObjectId = <T>(Obj: T) => {
  const { _id, ...rest } = Obj;
  return rest;
};
