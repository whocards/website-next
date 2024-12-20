'use client'

import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {parseAsStringLiteral, useQueryState} from 'nuqs'

import {useRouter} from 'next/navigation'
import {Button} from '~/components/ui/button'
import {Checkbox} from '~/components/ui/checkbox'
import {ComboboxCountries} from '~/components/ui/combobox-countries'
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '~/components/ui/form'
import {Input} from '~/components/ui/input'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '~/components/ui/select'
import {Separator} from '~/components/ui/separator'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '~/components/ui/tabs'
import {type PurchaseComplete, purchaseCompleteCreateSchema, purchaseCompleteSchema} from '~/types/db'
import {useToast} from '~/hooks/use-toast'

import {categories, newPurchase} from './purchase-constants'
import {hasPermission} from '~/lib/permissions'
import {useUser} from '~/hooks/use-user'
import {api} from '~/trpc/react'
import {cn} from '~/lib/utils'
import {parseError} from '~/lib/error'

const tabOptions = ['purchase', 'shipping'] as const
type TabOption = (typeof tabOptions)[number]

type Props = {
  purchase?: PurchaseComplete
}

export const PurchaseForm = ({purchase}: Props) => {
  const isUpdate = !!purchase
  const [isNameEmailSame, setIsNameEmailSame] = useState(false) // TODO implement
  const {toast} = useToast()
  const router = useRouter()
  const user = useUser()
  const [tab, setTab] = useQueryState<TabOption>('tab', parseAsStringLiteral(tabOptions).withDefault('purchase'))

  const editOne = api.purchases.updateOne.useMutation()
  const createOne = api.purchases.createOne.useMutation()

  const form = useForm<PurchaseComplete>({
    resolver: zodResolver(isUpdate ? purchaseCompleteSchema : purchaseCompleteCreateSchema),
    defaultValues: purchase ?? newPurchase,
    reValidateMode: 'onBlur',
  })

  const onSubmit = async (data: PurchaseComplete) => {
    try {
      if (purchase) {
        await editOne.mutateAsync(data)
      } else {
        const newPurchase = (await createOne.mutateAsync(data))?.[0]
        if (newPurchase?.purchaseId) {
          router.push(`/wc/purchases/${newPurchase?.purchaseId}`)
        }
      }
      toast({
        title: isUpdate ? 'Purchase updated' : 'Purchase created',
        description: `The purchase has been ${isUpdate ? 'updated' : 'created'} successfully`,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: isUpdate ? 'Purchase update failed' : 'Purchase creation failed',
        description: parseError(error),
      })
    }
  }

  const canEdit = hasPermission(user, 'purchases', isUpdate ? 'edit' : 'create')
  const isLoading = editOne.isPending || createOne.isPending

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mx-auto w-full max-w-2xl md:rounded-lg md:border'>
        <Tabs
          value={tab}
          onValueChange={(value) => void setTab(value as TabOption)}
          className={cn('w-full', !canEdit && 'pointer-events-none')}
        >
          <TabsList className='grid w-full grid-cols-2 md:rounded-b-none'>
            <TabsTrigger value='purchase'>Purchase</TabsTrigger>
            <TabsTrigger value='shipping'>Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value='purchase'>
            <div className='grid grid-cols-1 gap-4 pt-2 md:grid-cols-2 md:px-4'>
              <FormField
                name='user.name'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Abraham Lincoln' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='user.email'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='name@example.com' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='shipping.company'
                control={form.control}
                render={({field: {value, ...field}}) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input type='text' value={value ?? ''} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='user.newsletter'
                control={form.control}
                render={({field}) => (
                  <FormItem className='flex flex-row items-center gap-2 space-y-0 self-end rounded-md border border-transparent py-[11px] md:px-3'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className='leading-4'>Subscribe to Newsletter</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className='md:col-span-2' />
              <FormField
                name='category'
                control={form.control}
                render={({field}) => {
                  return (
                    <FormItem>
                      <FormLabel className='leading-4'>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a category'>{field.value}</SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                name='shipping.quantity'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder='Quantity of items' min={1} type='number' {...field} />
                    </FormControl>
                    <FormDescription>TODO connect to category</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='price'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <div className='relative'>
                      <span className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-sm text-muted-foreground'>
                        €
                      </span>
                      <FormControl>
                        <Input
                          placeholder='Price of items'
                          min={0}
                          className='pl-6'
                          {...field}
                          value={field.value / 100}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value.replace(/\D/g, '')))
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='netPrice'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Net Price</FormLabel>
                    <div className='relative'>
                      <span className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-sm text-muted-foreground'>
                        €
                      </span>
                      <FormControl>
                        <Input
                          placeholder='Net Price of items'
                          min={0}
                          className='pl-6'
                          {...field}
                          value={field.value / 100}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value.replace(/\D/g, '')))
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          <TabsContent value='shipping'>
            <div className='grid grid-cols-1 gap-4 pt-2 md:grid-cols-2 md:px-4'>
              <FormField
                name='shipping.name'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isNameEmailSame} placeholder='Abraham Lincoln' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='shipping.email'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isNameEmailSame} placeholder='name@example.com' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className='flex flex-row items-center gap-2 space-y-0 self-end rounded-md border border-transparent pb-2 md:col-span-2'>
                <FormControl>
                  <Checkbox
                    checked={isNameEmailSame}
                    onCheckedChange={(checked) => setIsNameEmailSame(checked === true)}
                  />
                </FormControl>
                <FormLabel className='leading-4'>Name and email are the same as the purchase information</FormLabel>
                <FormMessage />
              </FormItem>
              <FormField
                name='shipping.phone'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      {/* TODO add phone number validation */}
                      <Input disabled={isNameEmailSame} placeholder='+36706288363' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='shipping.address'
                control={form.control}
                render={({field}) => (
                  <FormItem className='col-start-1 md:col-span-2'>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='shipping.address2'
                control={form.control}
                render={({field: {value, ...field}}) => (
                  <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input type='text' value={value ?? ''} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='shipping.zip'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='shipping.city'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='shipping.country'
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <ComboboxCountries value={field.value} setValue={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>
        <div
          className='ml-auto grid w-full grid-cols-2 gap-2 pb-4 pt-6 md:col-start-2 md:w-1/2 md:gap-4 md:pl-2 md:pr-4'
          onMouseEnter={() => void form.trigger()}
        >
          <Button
            variant='destructive'
            type='button'
            onClick={(e) => {
              e.stopPropagation()
              router.back()
            }}
          >
            Cancel
          </Button>
          {tab === 'purchase' ? (
            <Button
              type='button'
              onClick={(e) => {
                e.stopPropagation()
                void setTab('shipping')
              }}
            >
              Next
            </Button>
          ) : (
            <Button type='submit' disabled={isLoading || !canEdit || !form.formState.isValid}>
              {isUpdate ? 'Update' : 'Create'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
