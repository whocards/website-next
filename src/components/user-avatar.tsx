'use client'

import * as React from 'react'

import {Avatar, AvatarImage, AvatarFallback} from './ui/avatar'
import {useUser} from '~/hooks/use-user'

type UserAvatarProps = {
  name?: string | null
  image?: string | null
}

export const UserAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar> & UserAvatarProps,
  React.ComponentPropsWithoutRef<typeof Avatar> & UserAvatarProps
>(({name, image, ...props}, ref) => {
  return (
    <Avatar ref={ref} {...props}>
      <AvatarImage src={image ?? undefined} alt={name ?? undefined} />
      <AvatarFallback>
        {name
          ?.split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase() ?? 'WC'}
      </AvatarFallback>
    </Avatar>
  )
})
UserAvatar.displayName = 'UserAvatar'

export const CurrentUserAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  React.ComponentPropsWithoutRef<typeof Avatar>
>((props, ref) => {
  const user = useUser()

  return (
    <Avatar ref={ref} {...props}>
      <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? undefined} />
      <AvatarFallback>
        {user?.name
          ?.split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase() ?? 'WC'}
      </AvatarFallback>
    </Avatar>
  )
})
CurrentUserAvatar.displayName = 'CurrentUserAvatar'
