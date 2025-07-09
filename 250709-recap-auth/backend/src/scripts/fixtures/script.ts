import { Plan } from "../../entities/Plan";
import { Scenario } from "../../entities/Scenario";
import { User } from "../../entities/User";
import { dataSource } from "../../lib/typeorm/dataSource";
import { plans, scenarios, users } from "./data/dev";

async function generateAndSaveFixtures() {
  try {
    await dataSource.initialize();
    await dataSource.synchronize(true);

    const savedUsers = await Promise.all(
      users.map(async (userData) => {
        const user = Object.assign(new User(), { ...userData });
        return user.save();
      })
    );

    const savedScenarios = await Promise.all(
      scenarios.map(async (scenarioData) => {
        const scenario = Object.assign(new Scenario(), { ...scenarioData });
        scenario.owner = savedUsers[scenarioData.ownerIndex];
        return scenario.save();
      })
    );

    const savedPlans = await Promise.all(
      plans.map(async (planData) => {
        const plan = Object.assign(new Plan(), {
          ...planData,
          scenario: savedScenarios[planData.scenarioIndex],
          owner: savedUsers[planData.ownerIndex],
        });
        return plan.save();
      })
    );

    console.info(`
    Fixtures enregistrées avec succès :
    - ${savedScenarios.length} Scenarios
    - ${savedPlans.length} Plans
    - ${savedUsers.length} Utilisateurs
    `);
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement des fixtures:", error);
  } finally {
    await dataSource.destroy();
  }
}

generateAndSaveFixtures();
