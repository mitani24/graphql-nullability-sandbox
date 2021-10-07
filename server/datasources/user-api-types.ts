export type GetUsersResponse = {
  userIds: string[];
  pageInfo: PageInfo;
  totalCount: number;
};

export type GetUserResponse = {
  id: string;
  email: string;
  username: string;
};

export type PageInfo = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor?: string;
  endCursor?: string;
};
