'use client'

import {DataTable} from '~/components/table/data-table'
import {columns} from '~/features/users/users-columns'
import {api, type RouterOutputs} from '~/trpc/react'

type Props = {
  initialData: RouterOutputs['users']['getAll']
}

export const UsersTable = ({initialData}: Props) => {
  const {data} = api.users.getAll.useQuery(undefined, {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return <DataTable data={data} columns={columns} />
}
