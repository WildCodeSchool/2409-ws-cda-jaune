import type { NonEmptyArray } from "type-graphql";
import PlanResolver from "./PlanResolver";
import ScenarioResolver from "./ScenarioResolver";
import UserResolver from "./UserResolver";

// biome-ignore lint/complexity/noBannedTypes: Using same type as type-graphql library
const resolvers: NonEmptyArray<Function> = [
  PlanResolver,
  ScenarioResolver,
  UserResolver,
];
export default resolvers;
