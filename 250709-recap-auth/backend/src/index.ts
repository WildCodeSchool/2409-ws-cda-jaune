import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { dataSource } from "./lib/typeorm/dataSource";
import resolvers from "./resolvers";

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
    //context
  });

  console.info(`🚀  Server ready at: ${url}`);
};

start();
