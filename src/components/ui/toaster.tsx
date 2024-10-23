import {useTranslations} from 'next-intl'

import {Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport} from '~/components/ui/toast'
import {useToast} from '~/hooks/use-toast'

export function Toaster() {
  const {toasts} = useToast()
  const t = useTranslations()

  return (
    <ToastProvider>
      {toasts.map(function ({id, title, description, action, ...props}) {
        return (
          <Toast key={id} {...props}>
            <div className='grid gap-1'>
              {title && <ToastTitle>{t(title as IntlMessage)}</ToastTitle>}
              {description && (
                <ToastDescription>
                  {typeof description === 'string' ? t(description as IntlMessage) : description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
