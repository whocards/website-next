'use client'

import {DataTable} from '~/components/table/data-table'
import type {AuthUser} from '~/types/db'
import {userColumns} from './users-columns'

type Props = {
  data: AuthUser[]
}

export const UsersTable = ({data}: Props) => {
  return <DataTable data={data} columns={userColumns} />
}
