import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { dataSource } from "./lib/typeorm/dataSource";
import resolvers from "./resolvers";
import { authChecker } from "./lib/helpers/authChecker";
import { AnonContext, AuthContext } from "./types/ApolloContext";
import getUserFromReq from "./lib/helpers/getUserFromReq";

dotenv.config();

const start = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers,
    authChecker: authChecker,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      const context: AnonContext | AuthContext = {
        req,
        res,
        user: getUserFromReq(req),
      };
      return context;
    },
  });

  console.info(`🚀  Server ready at: ${url}`);
};

start();
