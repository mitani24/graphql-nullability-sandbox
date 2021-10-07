import { RESTDataSource } from "apollo-datasource-rest";
import { GetUserResponse, GetUsersResponse } from "./user-api-types";

export type PaginationQuery = {
  first?: number;
  last?: number;
  before?: string;
  after?: string;
};

export class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000";
  }

  getUsers(query: PaginationQuery) {
    return this.get<GetUsersResponse>("/users", query);
  }

  getUser(userId: string) {
    return this.get<GetUserResponse>(`/users/${userId}`);
  }

  getFollowers(userId: string, query: PaginationQuery) {
    return this.get<GetUsersResponse>(`/users/${userId}/followers`, query);
  }
}
