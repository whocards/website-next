'use client'

import {signOut} from 'next-auth/react'
import {redirect} from 'next/navigation'
import {useEffect} from 'react'
import {useSessionUser} from '~/hooks/use-session-user'

export default function LogoutPage() {
  const user = useSessionUser()

  useEffect(() => {
    if (user) {
      return redirect('/login')
    }

    void signOut({redirectTo: '/login'})
  }, [user])

  return null
}
