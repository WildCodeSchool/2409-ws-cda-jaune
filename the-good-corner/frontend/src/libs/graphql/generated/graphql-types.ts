import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  category: Category;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
};

export type AdInput = {
  category: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  picture: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  tags: Array<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  ads: Array<Ad>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAd: Ad;
  deleteAdById: Scalars['Boolean']['output'];
  login: Scalars['String']['output'];
  replaceAdById: Ad;
  signup: Scalars['String']['output'];
};


export type MutationCreateAdArgs = {
  data: AdInput;
};


export type MutationDeleteAdByIdArgs = {
  adId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  data: UserInput;
};


export type MutationReplaceAdByIdArgs = {
  adId: Scalars['String']['input'];
  data: AdInput;
};


export type MutationSignupArgs = {
  data: NewUserInput;
};

export type NewUserInput = {
  mail: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAdById: Ad;
  getAds: Array<Ad>;
  getAdsByCategory: Array<Ad>;
  getAdsByNeedle: Array<Ad>;
  getCategories: Array<Category>;
  getTags: Array<Tag>;
  getUsers: Array<User>;
  getUsersAsAdmin: Array<User>;
  getUsersAsUser: Array<User>;
};


export type QueryGetAdByIdArgs = {
  adId: Scalars['String']['input'];
};


export type QueryGetAdsByCategoryArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryGetAdsByNeedleArgs = {
  needle: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  ads: Array<Ad>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  hashedPassword: Scalars['String']['output'];
  id: Scalars['String']['output'];
  mail: Scalars['String']['output'];
  name: Scalars['String']['output'];
  roles: Scalars['String']['output'];
};

export type UserInput = {
  mail: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type GetCategoriesAndTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesAndTagsQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string }>, getTags: Array<{ __typename?: 'Tag', id: string, name: string }> };

export type CreateAdMutationVariables = Exact<{
  data: AdInput;
}>;


export type CreateAdMutation = { __typename?: 'Mutation', createAd: { __typename?: 'Ad', id: string } };

export type ReplaceAdMutationVariables = Exact<{
  data: AdInput;
  adId: Scalars['String']['input'];
}>;


export type ReplaceAdMutation = { __typename?: 'Mutation', replaceAdById: { __typename?: 'Ad', id: string } };

export type DeleteAdMutationVariables = Exact<{
  adId: Scalars['String']['input'];
}>;


export type DeleteAdMutation = { __typename?: 'Mutation', deleteAdById: boolean };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type GetAdQueryVariables = Exact<{
  adId: Scalars['String']['input'];
}>;


export type GetAdQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: string, title: string, description: string, owner: string, price: number, picture: string, location: string, createdAt: any, category: { __typename?: 'Category', id: string, name: string }, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } };

export type GetAdsByCategoryQueryVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type GetAdsByCategoryQuery = { __typename?: 'Query', getAdsByCategory: Array<{ __typename?: 'Ad', id: string, title: string, price: number, picture: string }> };

export type GetAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdsQuery = { __typename?: 'Query', getAds: Array<{ __typename?: 'Ad', id: string, title: string, description: string, owner: string, price: number, picture: string, location: string, createdAt: any }> };

export type GetAdsByNeedleQueryVariables = Exact<{
  needle: Scalars['String']['input'];
}>;


export type GetAdsByNeedleQuery = { __typename?: 'Query', getAdsByNeedle: Array<{ __typename?: 'Ad', id: string, title: string }> };

export type LoginMutationVariables = Exact<{
  data: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };


export const GetCategoriesAndTagsDocument = gql`
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

/**
 * __useGetCategoriesAndTagsQuery__
 *
 * To run a query within a React component, call `useGetCategoriesAndTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesAndTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesAndTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesAndTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesAndTagsQuery, GetCategoriesAndTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesAndTagsQuery, GetCategoriesAndTagsQueryVariables>(GetCategoriesAndTagsDocument, options);
      }
export function useGetCategoriesAndTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesAndTagsQuery, GetCategoriesAndTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesAndTagsQuery, GetCategoriesAndTagsQueryVariables>(GetCategoriesAndTagsDocument, options);
        }
export function useGetCategoriesAndTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesAndTagsQuery, GetCategoriesAndTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesAndTagsQuery, GetCategoriesAndTagsQueryVariables>(GetCategoriesAndTagsDocument, options);
        }
export type GetCategoriesAndTagsQueryHookResult = ReturnType<typeof useGetCategoriesAndTagsQuery>;
export type GetCategoriesAndTagsLazyQueryHookResult = ReturnType<typeof useGetCategoriesAndTagsLazyQuery>;
export type GetCategoriesAndTagsSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesAndTagsSuspenseQuery>;
export type GetCategoriesAndTagsQueryResult = Apollo.QueryResult<GetCategoriesAndTagsQuery, GetCategoriesAndTagsQueryVariables>;
export const CreateAdDocument = gql`
    mutation CreateAd($data: AdInput!) {
  createAd(data: $data) {
    id
  }
}
    `;
export type CreateAdMutationFn = Apollo.MutationFunction<CreateAdMutation, CreateAdMutationVariables>;

/**
 * __useCreateAdMutation__
 *
 * To run a mutation, you first call `useCreateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdMutation, { data, loading, error }] = useCreateAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAdMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdMutation, CreateAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdMutation, CreateAdMutationVariables>(CreateAdDocument, options);
      }
export type CreateAdMutationHookResult = ReturnType<typeof useCreateAdMutation>;
export type CreateAdMutationResult = Apollo.MutationResult<CreateAdMutation>;
export type CreateAdMutationOptions = Apollo.BaseMutationOptions<CreateAdMutation, CreateAdMutationVariables>;
export const ReplaceAdDocument = gql`
    mutation ReplaceAd($data: AdInput!, $adId: String!) {
  replaceAdById(data: $data, adId: $adId) {
    id
  }
}
    `;
export type ReplaceAdMutationFn = Apollo.MutationFunction<ReplaceAdMutation, ReplaceAdMutationVariables>;

/**
 * __useReplaceAdMutation__
 *
 * To run a mutation, you first call `useReplaceAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplaceAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replaceAdMutation, { data, loading, error }] = useReplaceAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *      adId: // value for 'adId'
 *   },
 * });
 */
export function useReplaceAdMutation(baseOptions?: Apollo.MutationHookOptions<ReplaceAdMutation, ReplaceAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplaceAdMutation, ReplaceAdMutationVariables>(ReplaceAdDocument, options);
      }
export type ReplaceAdMutationHookResult = ReturnType<typeof useReplaceAdMutation>;
export type ReplaceAdMutationResult = Apollo.MutationResult<ReplaceAdMutation>;
export type ReplaceAdMutationOptions = Apollo.BaseMutationOptions<ReplaceAdMutation, ReplaceAdMutationVariables>;
export const DeleteAdDocument = gql`
    mutation DeleteAd($adId: String!) {
  deleteAdById(adId: $adId)
}
    `;
export type DeleteAdMutationFn = Apollo.MutationFunction<DeleteAdMutation, DeleteAdMutationVariables>;

/**
 * __useDeleteAdMutation__
 *
 * To run a mutation, you first call `useDeleteAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdMutation, { data, loading, error }] = useDeleteAdMutation({
 *   variables: {
 *      adId: // value for 'adId'
 *   },
 * });
 */
export function useDeleteAdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAdMutation, DeleteAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAdMutation, DeleteAdMutationVariables>(DeleteAdDocument, options);
      }
export type DeleteAdMutationHookResult = ReturnType<typeof useDeleteAdMutation>;
export type DeleteAdMutationResult = Apollo.MutationResult<DeleteAdMutation>;
export type DeleteAdMutationOptions = Apollo.BaseMutationOptions<DeleteAdMutation, DeleteAdMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetAdDocument = gql`
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

/**
 * __useGetAdQuery__
 *
 * To run a query within a React component, call `useGetAdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdQuery({
 *   variables: {
 *      adId: // value for 'adId'
 *   },
 * });
 */
export function useGetAdQuery(baseOptions: Apollo.QueryHookOptions<GetAdQuery, GetAdQueryVariables> & ({ variables: GetAdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdQuery, GetAdQueryVariables>(GetAdDocument, options);
      }
export function useGetAdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdQuery, GetAdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdQuery, GetAdQueryVariables>(GetAdDocument, options);
        }
export function useGetAdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdQuery, GetAdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdQuery, GetAdQueryVariables>(GetAdDocument, options);
        }
export type GetAdQueryHookResult = ReturnType<typeof useGetAdQuery>;
export type GetAdLazyQueryHookResult = ReturnType<typeof useGetAdLazyQuery>;
export type GetAdSuspenseQueryHookResult = ReturnType<typeof useGetAdSuspenseQuery>;
export type GetAdQueryResult = Apollo.QueryResult<GetAdQuery, GetAdQueryVariables>;
export const GetAdsByCategoryDocument = gql`
    query GetAdsByCategory($categoryId: String!) {
  getAdsByCategory(categoryId: $categoryId) {
    id
    title
    price
    picture
  }
}
    `;

/**
 * __useGetAdsByCategoryQuery__
 *
 * To run a query within a React component, call `useGetAdsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdsByCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetAdsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables> & ({ variables: GetAdsByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>(GetAdsByCategoryDocument, options);
      }
export function useGetAdsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>(GetAdsByCategoryDocument, options);
        }
export function useGetAdsByCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>(GetAdsByCategoryDocument, options);
        }
export type GetAdsByCategoryQueryHookResult = ReturnType<typeof useGetAdsByCategoryQuery>;
export type GetAdsByCategoryLazyQueryHookResult = ReturnType<typeof useGetAdsByCategoryLazyQuery>;
export type GetAdsByCategorySuspenseQueryHookResult = ReturnType<typeof useGetAdsByCategorySuspenseQuery>;
export type GetAdsByCategoryQueryResult = Apollo.QueryResult<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>;
export const GetAdsDocument = gql`
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

/**
 * __useGetAdsQuery__
 *
 * To run a query within a React component, call `useGetAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdsQuery(baseOptions?: Apollo.QueryHookOptions<GetAdsQuery, GetAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdsQuery, GetAdsQueryVariables>(GetAdsDocument, options);
      }
export function useGetAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdsQuery, GetAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdsQuery, GetAdsQueryVariables>(GetAdsDocument, options);
        }
export function useGetAdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdsQuery, GetAdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdsQuery, GetAdsQueryVariables>(GetAdsDocument, options);
        }
export type GetAdsQueryHookResult = ReturnType<typeof useGetAdsQuery>;
export type GetAdsLazyQueryHookResult = ReturnType<typeof useGetAdsLazyQuery>;
export type GetAdsSuspenseQueryHookResult = ReturnType<typeof useGetAdsSuspenseQuery>;
export type GetAdsQueryResult = Apollo.QueryResult<GetAdsQuery, GetAdsQueryVariables>;
export const GetAdsByNeedleDocument = gql`
    query GetAdsByNeedle($needle: String!) {
  getAdsByNeedle(needle: $needle) {
    id
    title
  }
}
    `;

/**
 * __useGetAdsByNeedleQuery__
 *
 * To run a query within a React component, call `useGetAdsByNeedleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdsByNeedleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdsByNeedleQuery({
 *   variables: {
 *      needle: // value for 'needle'
 *   },
 * });
 */
export function useGetAdsByNeedleQuery(baseOptions: Apollo.QueryHookOptions<GetAdsByNeedleQuery, GetAdsByNeedleQueryVariables> & ({ variables: GetAdsByNeedleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdsByNeedleQuery, GetAdsByNeedleQueryVariables>(GetAdsByNeedleDocument, options);
      }
export function useGetAdsByNeedleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdsByNeedleQuery, GetAdsByNeedleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdsByNeedleQuery, GetAdsByNeedleQueryVariables>(GetAdsByNeedleDocument, options);
        }
export function useGetAdsByNeedleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdsByNeedleQuery, GetAdsByNeedleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdsByNeedleQuery, GetAdsByNeedleQueryVariables>(GetAdsByNeedleDocument, options);
        }
export type GetAdsByNeedleQueryHookResult = ReturnType<typeof useGetAdsByNeedleQuery>;
export type GetAdsByNeedleLazyQueryHookResult = ReturnType<typeof useGetAdsByNeedleLazyQuery>;
export type GetAdsByNeedleSuspenseQueryHookResult = ReturnType<typeof useGetAdsByNeedleSuspenseQuery>;
export type GetAdsByNeedleQueryResult = Apollo.QueryResult<GetAdsByNeedleQuery, GetAdsByNeedleQueryVariables>;
export const LoginDocument = gql`
    mutation login($data: UserInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;