import { TypedDocumentNode, gql } from "@apollo/client"

import type { PaginateOutput } from "../../typings/api"
import type { FilterInput, Navigation } from "../../typings/navigation"

export const NAVIGATIONS: TypedDocumentNode<
  {
    navigations: PaginateOutput<Navigation>
  },
  {
    filterInput: FilterInput
  }
> = gql`
  query Navigations($filterInput: FilterNavigationInput!) {
    navigations(filterInput: $filterInput) {
      items {
        id
        title
        tags {
          id
        }
      }
    }
  }
`
