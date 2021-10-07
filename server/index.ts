import fs from "fs";
import path from "path";
import { ApolloServer, gql } from "apollo-server";
import { UserAPI } from "./datasources/user-api";
import resolvers from "./resolvers";

const typeDefs = fs
  .readFileSync(path.join(__dirname, "../schema.graphql"))
  .toString();

const server = new ApolloServer({
  typeDefs: gql`
    ${typeDefs}
  `,
  dataSources() {
    return { userAPI: new UserAPI() };
  },
  resolvers,
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});
