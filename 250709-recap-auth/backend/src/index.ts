import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { dataSource } from "./lib/typeorm/dataSource";
import resolvers from "./resolvers";
import { verify } from "jsonwebtoken";

dotenv.config();

const start = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers,
    //authChecker,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      // checks
      if (!process.env.JWT_SECRET) throw new Error("Missing env: JWT_SECRET !");

      // est-ce qu'il y a un cookie attaché ?
      const roleetAuthToken = req.headers.cookie?.match(
        /roleetAuthToken=([^;]+)/
      );
      if (!roleetAuthToken) return { req, res };

      const token = roleetAuthToken[1];
      const user = verify(token, process.env.JWT_SECRET);
      if (typeof user === "string") return { req, res };

      return { req, res, user };
    },
  });

  console.info(`🚀  Server ready at: ${url}`);
};

start();
