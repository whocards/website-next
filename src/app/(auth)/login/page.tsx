import {LoginForm} from '~/components/forms/login-form'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'WhoCards | Login',
  description: 'WhoCards Login',
}

export default function Page() {
  return (
    <div className='container mx-auto flex h-screen w-full items-center justify-center px-4'>
      <LoginForm />
    </div>
  )
}
