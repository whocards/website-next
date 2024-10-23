import type {NestedValueOf} from 'next-intl'

import type en from './i18n/messages/en.json'

type Messages = typeof en

declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages
  type IntlMessage = NestedValueOf<Messages>
}
