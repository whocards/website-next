import {LoginForm} from '~/components/forms/login-form'
import type {Metadata} from 'next'
import {signIn} from '~/server/auth'

export const metadata: Metadata = {
  title: 'WhoCards | Login',
  description: 'WhoCards Login',
}

const signInResend = async (formData: FormData) => {
  'use server'
  await signIn('resend', formData, {redirectTo: '/me'})
}

const signInGoogle = async () => {
  'use server'
  await signIn('google', {redirectTo: '/me'})
}

const signInGithub = async () => {
  'use server'
  await signIn('github', {redirectTo: '/me'})
}

export default function Page() {
  return (
    <div className='container mx-auto flex h-screen w-full items-center justify-center px-4'>
      <LoginForm signInResend={signInResend} signInGoogle={signInGoogle} signInGithub={signInGithub} />
    </div>
  )
}
