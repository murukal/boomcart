import { ApolloClient, InMemoryCache } from "@apollo/client"

/**
 * 生成一个graphql请求客户端对象
 */
const client = new ApolloClient({
  uri: "",
  cache: new InMemoryCache()
})

export default client
