import z from 'node_modules/zod/lib'
import {categories} from './purchase-constants'

export const purchaseFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  date: z.date(),
  category: z.enum(categories),
  quantity: z.number().min(1),
  price: z.number().min(1),
  netPrice: z.number().min(1),
  newsletter: z.boolean(),
  shipping: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    company: z.string().optional(),
    address: z.string().min(1),
    address2: z.string().optional(),
    zip: z.string().min(1),
    city: z.string().min(1),
    region: z.string().optional(),
    country: z.string().min(2).max(2),
  }),
})

export type PurchaseFormType = z.infer<typeof purchaseFormSchema>
