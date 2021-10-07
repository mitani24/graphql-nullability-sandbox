import { UserAPI } from "./datasources/user-api";
import { GetUsersResponse } from "./datasources/user-api-types";

export type Context = {
  dataSources: {
    userAPI: UserAPI;
  };
};

export type UserConnectionModel = GetUsersResponse;

export type UserEdgeModel = {
  cursor: string;
  node: UserModel;
};

export type UserModel = {
  id: string;
};
