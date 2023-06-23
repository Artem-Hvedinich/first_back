import { ObjectId } from "mongodb";

export const deleteObjectId = <T>(Obj: any) => {
  const { _id, ...rest } = Obj;
  return rest as T;
};
