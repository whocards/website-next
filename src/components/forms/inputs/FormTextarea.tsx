import {forwardRef} from 'react'
import {type UseFormRegisterReturn} from 'react-hook-form'

import {FormControl, FormItem, FormLabel, FormMessage} from '~/ui/form'
import {Textarea, type TextareaProps} from '~/ui/textarea'

type Props = UseFormRegisterReturn &
  Omit<TextareaProps, 'id'> & {
    label: string
    labelClassName?: string
  }

export const FormTextarea = forwardRef<HTMLTextAreaElement, Props>(({label, labelClassName, ...props}, ref) => {
  return (
    <FormItem>
      <FormLabel htmlFor={props.name} className={labelClassName}>
        {label}
      </FormLabel>
      <FormControl>
        <Textarea {...props} id={props.name} ref={ref} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
})

FormTextarea.displayName = 'FormTextarea'
