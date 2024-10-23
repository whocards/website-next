import {z} from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {message: 'Password must be at least 1 characters long'}),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
