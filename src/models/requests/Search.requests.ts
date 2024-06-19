import { PaginationQuery } from '.'

export type SearchWatchQuery = PaginationQuery & {
  name?: string
  brand?: string
}
