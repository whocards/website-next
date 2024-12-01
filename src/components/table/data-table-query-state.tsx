import type {PaginationState} from '@tanstack/react-table'
import {type SortingState} from '@tanstack/react-table'
import {createParser, useQueryState} from 'nuqs'

const defaultState: PaginationState = {
  pageIndex: 1,
  pageSize: 10,
}

const paginationParser = createParser<PaginationState>({
  parse: (value) => {
    const [pageIndex, pageSize] = value.split(',')
    return {
      pageIndex: parseInt(pageIndex ?? `${defaultState.pageIndex}`) - 1,
      pageSize: parseInt(pageSize ?? `${defaultState.pageSize}`),
    }
  },
  serialize: (value) => {
    return `${value.pageIndex + 1},${value.pageSize}`
  },
})

export const useTablePaginationState = () => useQueryState('page', paginationParser.withDefault(defaultState))

const sortingParser = createParser<SortingState>({
  parse: (value) => {
    return value
      .split(',')
      .map((item) => {
        const [id, desc] = item.split('-')
        if (!id) return
        return {id, desc: desc === 'desc'}
      })
      .filter((item) => !!item)
  },
  serialize: (value) => {
    return value.map((item) => `${item.id}-${item.desc ? 'desc' : 'asc'}`).join(',')
  },
})

export const useTableSortingState = () => useQueryState('sort', sortingParser.withDefault([]))
