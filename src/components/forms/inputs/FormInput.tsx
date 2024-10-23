import {forwardRef} from 'react'
import {type UseFormRegisterReturn} from 'react-hook-form'

import {FormControl, FormItem, FormLabel, FormMessage} from '~/ui/form'
import {Input, type InputProps} from '~/ui/input'

type Props = UseFormRegisterReturn &
  Omit<InputProps, 'id'> & {
    label: string
    labelClassName?: string
  }

export const FormInput = forwardRef<HTMLInputElement, Props>(({label, labelClassName, ...props}, ref) => {
  return (
    <FormItem>
      <FormLabel htmlFor={props.name} className={labelClassName}>
        {label}
      </FormLabel>
      <FormControl>
        <Input {...props} id={props.name} ref={ref} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
})

FormInput.displayName = 'FormInput'
