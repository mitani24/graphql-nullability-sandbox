import {
  QueryResolvers,
  Resolvers,
  Query,
  UserResolvers,
  UserConnectionResolvers,
} from "./lib/graphql-resolver-types";

const toNonNullQuery = <T extends Record<string, string | number | null>>(
  query: T
) => {
  (Object.keys(query) as (keyof typeof query)[]).forEach((key) => {
    if (!query[key]) delete query[key];
  });
  return query as Record<string, string | number>;
};

const Query: QueryResolvers = {
  async users(_, args, { dataSources }) {
    const query = toNonNullQuery({ ...args });
    return await dataSources.userAPI.getUsers(query);
  },
  user(_, { id }, { dataSources }) {
    return dataSources.userAPI.getUser(id);
  },
};

const UserConnection: UserConnectionResolvers = {
  edges({ userIds }) {
    return userIds.map((userId) => ({
      cursor: userId,
      node: {
        id: userId,
      },
    }));
  },
  nodes({ userIds }) {
    return userIds.map((userId) => ({ id: userId }));
  },
  pageInfo: ({ pageInfo }) => pageInfo,
  totalCount: ({ totalCount }) => totalCount,
};

const User: UserResolvers = {
  async email({ id }, _, { dataSources }) {
    const user = await dataSources.userAPI.getUser(id);
    return user.email;
  },
  async username({ id }, _, { dataSources }) {
    const user = await dataSources.userAPI.getUser(id);
    return user.username;
  },
  async followers({ id }, args, { dataSources }) {
    const query = toNonNullQuery({ ...args });
    return await dataSources.userAPI.getFollowers(id, query);
  },
};

const resolvers: Resolvers = {
  Query,
  User,
  UserConnection,
};

export default resolvers;
