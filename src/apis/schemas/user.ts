import { TypedDocumentNode, gql } from "@apollo/client"

import type { User } from "../../typings/user"

/**
 * 获取当前用户信息
 */
export const WHO_AM_I: TypedDocumentNode<{
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
