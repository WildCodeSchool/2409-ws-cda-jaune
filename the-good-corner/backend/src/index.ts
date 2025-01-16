import "reflect-metadata";
import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import { AdResolver } from "./resolvers/AdResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as jwt from "jsonwebtoken";
import { config } from "dotenv";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { TagResolver } from "./resolvers/TagResolver";
import { UserResolver } from "./resolvers/UserResolver";

config();
const port = Number(process.env.BACKEND_PORT);
if (!port) throw new Error("Missing env variable: BACKEND_PORT");

const start = async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],
    authChecker: ({ context }, neededRoles) => {
      const rights: string[] = context.user?.roles.split("");
      if (!rights.length) return false;
      if (rights.includes("GOD")) return true;

      return neededRoles.some((roleCandidate) =>
        rights.includes(roleCandidate)
      );
    },
  });

  const apiServer = new ApolloServer({ schema });

  await startStandaloneServer(apiServer, {
    listen: { port },
    context: async ({ req, res }) => {
      if (!process.env.JWT_SECRET) return { res };
      const token = req.headers.cookie?.split("token=")[1];

      if (!token) return { res };

      const tokenContent = jwt.verify(token, process.env.JWT_SECRET);

      return {
        res,
        user: tokenContent,
      };
    },
  });

  console.log("Backend started on port#" + port);
};
start();
