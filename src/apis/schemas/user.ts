import { TypedDocumentNode, gql } from "@apollo/client"

import { fetcher } from ".."
import type { User } from "../../typings/user"

/**
 * 获取当前用户信息
 */
const WHO_AM_I: TypedDocumentNode<{
  whoAmI: User
}> = gql`
  query WhoAmI {
    whoAmI {
      id
      username
      isVerified
    }
  }
`

export const whoAmI = () =>
  fetcher.query({
    query: WHO_AM_I,
    fetchPolicy: "no-cache"
  })
