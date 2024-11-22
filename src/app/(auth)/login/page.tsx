import {LoginForm} from '~/components/forms/login-form'
import type {Metadata} from 'next'
import {auth} from '~/server/auth'
import {redirect} from 'next/navigation'

export const metadata: Metadata = {
  title: 'WhoCards | Login',
  description: 'WhoCards Login',
}

export default async function Page() {
  const session = await auth()
  if (session) {
    redirect('/me')
  }

  return (
    <div className='container mx-auto flex h-screen w-full items-center justify-center px-4'>
      <LoginForm />
    </div>
  )
}
