'use client'

import {Button} from '~/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '~/components/ui/card'
import {Input} from '~/components/ui/input'
import {Label} from '~/components/ui/label'
import {Separator} from '../ui/separator'
import Github from '~/assets/icons/github.svg'
import Google from '~/assets/icons/google.svg'
import {signIn} from 'next-auth/react'

export function LoginForm() {
  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='m@example.com' required disabled />
          </div>
          <Button type='submit' className='w-full' disabled>
            Login
          </Button>
          <Separator className='mx-auto my-2 h-0.5 w-[50%] bg-white/50' />
          <div className='flex gap-4'>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => {
                void signIn('google', {redirectTo: '/me'})
              }}
            >
              <Google className='size-5 fill-white' />
            </Button>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => {
                void signIn('github', {redirectTo: '/me'})
              }}
            >
              <Github className='size-5 fill-white' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
