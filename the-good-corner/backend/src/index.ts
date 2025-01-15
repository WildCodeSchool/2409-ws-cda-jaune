import "reflect-metadata";
import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import { AdResolver } from "./resolvers/AdResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as jwt from "jsonwebtoken";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { TagResolver } from "./resolvers/TagResolver";
import { UserResolver } from "./resolvers/UserResolver";

const port = 3000;

const start = async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],
    authChecker: ({ context }, neededRoles) => {
      // Interdit tout à tous
      // return false;

      // Autorise tout à tous
      // return true;

      // Autorise tout utilisateur connecté
      // if (context.user?.roles) return true;
      // else return false;

      // Autorise en fonction des roles
      console.log(neededRoles);
      console.log(context.user?.roles);

      if (neededRoles.includes(context.user?.roles)) return true;
      return false;
    },
  });

  const apiServer = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(apiServer, {
    listen: { port: port },
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

  console.log("Hey, ça marche ! =D");
  console.log(url);
};
start();
