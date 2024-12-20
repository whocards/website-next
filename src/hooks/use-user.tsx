import {useSession} from 'next-auth/react'

export const useUser = () => {
  const {data: session} = useSession()
  if (!session?.user) return

  return session.user
}
