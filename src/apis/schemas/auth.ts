import { TypedDocumentNode, gql } from "@apollo/client"

import type { LoginInput } from "../../typings/auth"

export const LOGIN: TypedDocumentNode<
  {
    login: string
  },
  {
    loginInput: LoginInput
  }
> = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput)
  }
`
