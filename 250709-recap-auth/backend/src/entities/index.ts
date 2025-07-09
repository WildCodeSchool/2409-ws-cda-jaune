import type { MixedList } from "typeorm";
import { Plan } from "./Plan";
import { Scenario } from "./Scenario";
import { User } from "./User";

// biome-ignore lint/complexity/noBannedTypes: Using same type as TypeORM library
const entities: MixedList<Function> = [Plan, Scenario, User];
export default entities;
