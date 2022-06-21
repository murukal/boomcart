import {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  FetchResult,
  InMemoryCache,
  MutationOptions,
  NetworkStatus,
  OperationVariables,
  QueryOptions,
  createHttpLink
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import type { GraphQLError } from "graphql"

import { store } from "../store"

const httpLink = createHttpLink({
  uri: "http://localhost:9100/graphql"
})

const authLink = setContext((_, { headers }) => {
  const token = store.getState().userProfile.token

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(token && {
        Authorization: `Bearer ${token}`
      })
    }
  }
})

/**
 * 生成一个graphql请求客户端对象
 */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
