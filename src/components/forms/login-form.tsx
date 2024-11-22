import {Button} from '~/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '~/components/ui/card'
import {Input} from '~/components/ui/input'
import {Label} from '~/components/ui/label'
import {Separator} from '~/components/ui/separator'
import Github from '~/assets/icons/github.svg'
import Google from '~/assets/icons/google.svg'
import {signIn} from '~/server/auth'

export function LoginForm() {
  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <form
            className='contents'
            action={async (formData) => {
              'use server'
              await signIn('resend', formData)
            }}
          >
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' name='email' placeholder='me@example.com' required />
            </div>
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </form>
          <Separator className='mx-auto my-2 h-0.5 w-[50%] bg-white/50' />
          <div className='flex gap-4'>
            <form
              className='contents'
              action={async () => {
                'use server'
                await signIn('google', {redirectTo: '/me'})
              }}
            >
              <Button variant='outline' type='submit' className='w-full'>
                <Google className='size-5 fill-white' />
              </Button>
            </form>
            <form
              className='contents'
              action={async () => {
                'use server'
                await signIn('github', {redirectTo: '/me'})
              }}
            >
              <Button variant='outline' className='w-full' type='submit'>
                <Github className='size-5 fill-white' />
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
