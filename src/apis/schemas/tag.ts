import { TypedDocumentNode, gql } from "@apollo/client"

import type { PaginateOutput } from "../../typings/api"
import type { Tag } from "../../typings/tag"

/**
 * 获取tag列表
 */
export const TAGS: TypedDocumentNode<{
  tags: PaginateOutput<Tag>
}> = gql`
  query Tags {
    tags {
      items {
        id
        name
      }
    }
  }
`
