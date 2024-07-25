import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import { readFile } from "node:fs/promises";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./graphql/resolvers.js";
import { getUser } from "./db/users.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const apolloContext = async ({ req }) => {
  if (!req.auth) {
    return {};
  }
  const user = await getUser(req.auth.sub);
  return { user };
};
const typeDefs = await readFile("./graphql/schema.graphql", "utf-8");
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
await apolloServer.start();
app.use("/graphql", apolloMiddleware(apolloServer, { context: apolloContext }));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL server running on http://localhost:${PORT}/graphql`);
});
