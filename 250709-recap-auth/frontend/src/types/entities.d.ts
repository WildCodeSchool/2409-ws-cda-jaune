import type {
  GetCampaignQuery,
  GetScenarioQuery,
} from "@/lib/graphql/generated/graphql-types";

declare namespace Entities {
  type Scenario = GetScenarioQuery["getScenario"];
  type Plan = Scenario["plans"][number];
}
export type { Entities };
