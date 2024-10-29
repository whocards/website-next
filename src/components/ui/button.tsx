import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'
import {ChevronRight, Loader2} from 'lucide-react'
import * as React from 'react'

import {cn} from '~/lib/utils'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap text-center transition-colors focus-visible:outline-none focus-visible:ring-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-dark hover:bg-yellow-500 active:bg-primary/90',
        secondary: 'bg-primary-dark text-white hover:bg-primary-dark/80 active:bg-primary-dark/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80 active:bg-destructive/90',
        outline: 'border border-foreground hover:bg-gray-100/25 active:bg-gray-200/25',
        ghost: 'hover:bg-foreground/10 active:bg-foreground/20',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'pl-7 pr-6 py-3.5 text-lg font-medium gap-2 rounded-2xl',
        sm: 'pl-4 pr-3 py-2 text-base font-medium gap-1.5 rounded-xl',
        icon: 'h-12 w-12 rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: 'link',
        size: ['default', 'sm', 'icon'],
        className: 'p-[initial]',
      },
    ],
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  asChild?: boolean
  loading?: boolean
  hideIcon?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {className, variant, size, asChild = false, loading = false, hideIcon: hideIconProp = false, children, ...props},
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const hideIcon = hideIconProp || variant === 'link' || size === 'icon'
    return (
      <Comp
        className={cn(buttonVariants({variant, size, className}), loading && 'pointer-events-none text-opacity-50')}
        ref={ref}
        {...props}
      >
        {children}
        {!hideIcon && !loading && <ChevronRight className={size === 'sm' ? 'h-5 w-5' : 'h-6 w-6'} />}
        {loading && <Loader2 className={cn(size === 'sm' ? 'h-5 w-5' : 'h-6 w-6', 'animate-spin')} />}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export {Button, buttonVariants}
