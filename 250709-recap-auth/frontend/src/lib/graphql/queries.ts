import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signup($data: NewUserInput!) {
    signup(data: $data)
  }
`;

// export const LOGIN = gql`
//   mutation login($data: UserInput!) {
//     login(data: $data)
//   }
// `;

// export const LOGOUT = gql`
//   mutation logout {
//     logout
//   }
// `;

export const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      name
      roles
    }
  }
`;

export const GET_ALL_SCENARIOS = gql`
  query getAllScenarios {
    getAllScenarios {
      id
      title
      teaser
      bannerUrl
      credits
    }
  }
`;

export const GET_MY_SCENARIOS = gql`
  query getMyScenarios {
    getMyScenarios {
      id
      title
      teaser
      bannerUrl
      credits
    }
  }
`;

export const GET_SCENARIO = gql`
  query getScenario($id: String!) {
    getScenario(id: $id) {
      id
      bannerUrl
      credits
      fullStory
      teaser
      title
      owner {
        id
      }
      plans {
        id
        title
        description
        pictureUrl
      }
    }
  }
`;

export const UNSEAL_SCENARIO = gql`
  mutation unsealScenario($unsealScenarioId: String!) {
    unsealScenario(id: $unsealScenarioId)
  }
`;

export const DELETE_SCENARIO = gql`
  mutation deleteScenario($deleteScenarioId: String!) {
    deleteScenario(id: $deleteScenarioId)
  }
`;

export const CREATE_SCENARIO = gql`
  mutation createScenario($data: NewScenarioInput!) {
    createScenario(data: $data) {
      id
      title
      teaser
      fullStory
      bannerUrl
      credits
    }
  }
`;

export const UPDATE_SCENARIO = gql`
  mutation updateScenario($id: String!, $data: ScenarioInput!) {
    updateScenario(id: $id, data: $data) {
      id
      title
      teaser
      fullStory
      bannerUrl
      credits
    }
  }
`;

export const CREATE_PLAN = gql`
  mutation createPlan($data: NewPlanInput!) {
    createPlan(data: $data) {
      id
    }
  }
`;

export const UPDATE_PLAN = gql`
  mutation updatePlan($id: String!, $data: PlanInput!) {
    updatePlan(id: $id, data: $data) {
      id
    }
  }
`;
