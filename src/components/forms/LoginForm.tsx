'use client'
import {zodResolver} from '@hookform/resolvers/zod'
import {GitHubLogoIcon as Github} from '@radix-ui/react-icons'
import Link from 'next/link'
import {signIn} from 'next-auth/react'
import {useTranslations} from 'next-intl'
import {useState} from 'react'
import {useForm} from 'react-hook-form'

import GoogleIcon from '~/assets/google.svg'
import {LoginSchema, type LoginSchemaType} from '~/types/validations'
import {Button} from '~/ui/button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '~/ui/card'
import {Form} from '~/ui/form'

import {FormInput} from './inputs/FormInput'

function LoginForm() {
  // const router = useRouter()
  // const {toast} = useToast()
  const t = useTranslations()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginSchemaType) => {
    setIsLoading(true)
    console.log({values})
  }

  return (
    <Card className='sm:min-w-[450px] sm:max-w-[500px]'>
      <CardHeader>
        <CardTitle className='text-center text-2xl sm:text-4xl'>{t('login.title')}</CardTitle>
        <CardDescription className='text-center'>{t('login.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form<LoginSchemaType> {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormInput {...form.register('email')} label={t('inputs.email')} placeholder={t('inputs.email')} />
            <FormInput
              {...form.register('password')}
              type='password'
              label={t('inputs.password')}
              placeholder={t('inputs.password')}
            />
            <div>
              <Button type='submit' loading={isLoading} className='w-full'>
                {t('login.title')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-5'>
        <div>
          <Link href='/password-recovery' className='text-sm text-muted-foreground hover:text-gray-600'>
            {t('login.forgot')}
          </Link>
        </div>
        <div className='flex w-full flex-col gap-3'>
          <Button
            variant='outline'
            size='lg'
            className='w-full'
            onClick={() =>
              signIn('github', {
                callbackUrl: '/profile',
              })
            }
          >
            <Github className='size-5' />
          </Button>
          <Button
            variant='outline'
            size='lg'
            className='w-full'
            onClick={() =>
              signIn('google', {
                callbackUrl: '/profile',
              })
            }
          >
            <GoogleIcon />
          </Button>
        </div>

        <div>
          <span className='text-sm'>
            {t('login.signUp.description')}{' '}
            <Link href='/register' className='text-sky-500 hover:text-sky-700'>
              {t('login.signUp.link')}
            </Link>
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default LoginForm
