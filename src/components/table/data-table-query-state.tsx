import {type SortingState} from '@tanstack/react-table'
import {parseAsInteger, parseAsJson, useQueryState} from 'nuqs'
import {z} from 'zod'

export const useTablePageState = () => useQueryState('page', parseAsInteger.withDefault(1))
export const useTablePageSizeState = () => useQueryState('pageSize', parseAsInteger.withDefault(10))

const sortingSchema = z
  .array(
    z.object({
      id: z.string(),
      desc: z.boolean(),
    })
  )
  .default([])

// eslint-disable-next-line @typescript-eslint/unbound-method
export const useTableSortingState = () => useQueryState('sorting', parseAsJson<SortingState>(sortingSchema.parse))
