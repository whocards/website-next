'use client'

import {signOut} from 'next-auth/react'
import {redirect} from 'next/navigation'
import {useEffect} from 'react'
import {useUser} from '~/hooks/use-user'

export default function LogoutPage() {
  const user = useUser()

  useEffect(() => {
    if (user) {
      return redirect('/login')
    }

    void signOut({redirectTo: '/login'})
  }, [user])

  return null
}
