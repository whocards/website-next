import type {User} from 'next-auth'
import type {UserRole} from '~/server/db/schema'
import type {AuthUser, Shipping} from '~/types/db'
import type {PurchaseWithUserAndShipping} from '~/types/purchases'

type Permissions = {
  portal: {
    dataType: null
    action: 'view'
  }
  users: {
    dataType: Pick<AuthUser, 'name' | 'email' | 'image'>
    action: 'edit' | 'view'
  }
  userRoles: {
    dataType: UserRole
    action: 'edit' | 'view'
  }
  purchases: {
    dataType: PurchaseWithUserAndShipping
    action: 'create' | 'delete' | 'edit' | 'view'
  }
  shippings: {
    dataType: Shipping
    action: 'create' | 'delete' | 'edit' | 'view'
  }
}

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]['dataType']) => boolean)

type RolesWithPermissions = {
  [R in UserRole]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]['action']]: PermissionCheck<Key>
    }>
  }>
}

export const ROLES: RolesWithPermissions = {
  owner: {
    portal: {
      view: true,
    },
    users: {
      edit: true,
      view: true,
    },
    userRoles: {
      edit: true,
      view: true,
    },
    purchases: {
      create: true,
      delete: true,
      edit: true,
      view: true,
    },
    shippings: {
      create: true,
      delete: true,
      edit: true,
      view: true,
    },
  },
  admin: {
    portal: {
      view: true,
    },
    users: {
      edit: true,
      view: true,
    },
    userRoles: {
      view: true,
    },
    purchases: {
      create: false, // TODO: implement createdByUserId
      delete: false, // TODO: implement createdByUserId
      edit: false, // TODO: implement createdByUserId
      view: true,
    },
    shippings: {
      create: false, // TODO: implement createdByUserId
      delete: false, // TODO: implement createdByUserId
      edit: false, // TODO: implement createdByUserId
      view: true,
    },
  },
  user: {
    users: {
      edit: (user, data) => user.email === data.email,
      view: (user, data) => user.email === data.email,
    },
    userRoles: {
      edit: false,
      view: false,
    },
    purchases: {
      create: false,
      delete: false,
      edit: false,
      view: (user, data) => user.email === data.user.email,
    },
    shippings: {
      create: false,
      delete: false,
      edit: false,
      view: (user, data) => user.email === data.email,
    },
  },
} as const

export const hasPermission = <Resource extends keyof Permissions>(
  user: User | undefined,
  resource: Resource,
  action: Permissions[Resource]['action'],
  data?: Permissions[Resource]['dataType']
) => {
  if (!user) return false
  return user.roles.some((role) => {
    const permission = ROLES[role][resource]?.[action]
    if (typeof permission === 'function') return !!data && permission(user, data)
    return !!permission
  })
}