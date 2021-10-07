import fastify from "fastify";
import { data } from "./data";
import { paginate } from "./pagination";
import type { PaginationQuery } from "./pagination";

const f = fastify({ logger: { prettyPrint: true } });

f.get<{ Querystring: PaginationQuery }>("/users", async (request, reply) => {
  const { newArr, pageInfo, totalCount } = paginate(data.users, request.query);

  return {
    userIds: newArr.map((user) => user.id),
    pageInfo,
    totalCount,
  };
});

f.get<{ Params: { id: string } }>("/users/:id", async (request, reply) => {
  const { id } = request.params;
  const user = data.users.find((user) => user.id === id);
  if (!user) {
    throw new Error("User not found");
  }
  return { id: user.id, email: user.email, username: user.username };
});

f.get<{ Params: { id: string }; Querystring: PaginationQuery }>(
  "/users/:id/followers",
  async (request, reply) => {
    const { id } = request.params;
    const user = data.users.find((user) => user.id === id);
    if (!user) {
      throw new Error("User not found");
    }

    const { newArr, pageInfo, totalCount } = paginate(
      user.followers.map((id) => ({ id })),
      request.query
    );

    return {
      userIds: newArr.map((user) => user.id),
      pageInfo,
      totalCount,
    };
  }
);

const start = async () => {
  try {
    const address = await f.listen(3000);
    console.log(`🚀 Server listening at ${address}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
