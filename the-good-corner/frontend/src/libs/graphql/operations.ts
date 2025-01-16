import { gql } from "@apollo/client";

export const GET_CATEGORIES_AND_TAGS = gql`
  query GetCategoriesAndTags {
    getCategories {
      id
      name
    }
    getTags {
      id
      name
    }
  }
`;

export const CREATE_AD = gql`
  mutation CreateAd($data: AdInput!) {
    createAd(data: $data) {
      id
    }
  }
`;

export const REPLACE_AD = gql`
  mutation ReplaceAd($data: AdInput!, $adId: String!) {
    replaceAdById(data: $data, adId: $adId) {
      id
    }
  }
`;

export const DELETE_AD = gql`
  mutation DeleteAd($adId: String!) {
    deleteAdById(adId: $adId)
  }
`;
export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`;

export const GET_AD = gql`
  query GetAd($adId: String!) {
    getAdById(adId: $adId) {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_ADS_BY_CATGEGORY = gql`
  query GetAdsByCategory($categoryId: String!) {
    getAdsByCategory(categoryId: $categoryId) {
      id
      title
      price
      picture
    }
  }
`;

export const GET_ADS = gql`
  query GetAds {
    getAds {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
    }
  }
`;

export const GET_ADS_BY_NEEDLE = gql`
  query GetAdsByNeedle($needle: String!) {
    getAdsByNeedle(needle: $needle) {
      id
      title
    }
  }
`;

export const LOGIN = gql`
  mutation login($data: UserInput!) {
    login(data: $data)
  }
`;
