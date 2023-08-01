/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      articles {
        items {
          id
          title
          content
          sourceUrl
          speechUrl
          userId
          createdAt
          updatedAt
          userArticlesId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        articles {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getArticle = /* GraphQL */ `
  query GetArticle($id: ID!) {
    getArticle(id: $id) {
      id
      title
      content
      sourceUrl
      speechUrl
      userId
      user {
        id
        email
        articles {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      userArticlesId
      __typename
    }
  }
`;
export const listArticles = /* GraphQL */ `
  query ListArticles(
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        sourceUrl
        speechUrl
        userId
        user {
          id
          email
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        userArticlesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const articlesByUserId = /* GraphQL */ `
  query ArticlesByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    articlesByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
        sourceUrl
        speechUrl
        userId
        user {
          id
          email
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        userArticlesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const generateSummaryTextQuery = /* GraphQL */ `
  query GenerateSummaryTextQuery($url: String!) {
    generateSummaryTextQuery(url: $url) {
      title
      summaryText
      __typename
    }
  }
`;
export const textToGenerateSpeech = /* GraphQL */ `
  query TextToGenerateSpeech($input: TextToGenerateSpeechInput!) {
    textToGenerateSpeech(input: $input)
  }
`;
