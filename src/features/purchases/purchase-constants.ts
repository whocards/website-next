import type {PurchaseCompleteCreate} from '~/types/db'

export const categories = ['SuperSpreader', 'Community', 'Friends', 'Gift One'] as const

export type Category = (typeof categories)[number]

export const newPurchase: Partial<PurchaseCompleteCreate> = {
  category: 'Gift One',
  price: 2700,
  netPrice: 2578,
  user: {
    email: '',
    name: '',
    newsletter: false,
  },
  shipping: {
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    address2: '',
    zip: '',
    city: '',
    country: '',
    quantity: 1,
    region: '',
  },
}
