import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

import { store } from "../store"
import { AppID } from "../utils/app"

const httpLink = createHttpLink({
  // 动态获取url
  uri: (operation) => {
    // 根据请求客户端appId标识不同，获取不同的请求地址
    // 后端对不同的api进行了服务隔离
    const context = operation.getContext()
    const appId = context.appId

    // 返回指定的URL
    // 为了解决跨域不携带cookie问题，在nginx层做反向代理，前端请求同域地址
    return `https://api.fantufantu.com/${appId || AppID.Boomemory}/graphql`
  }
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
