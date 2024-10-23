import type {Meta, StoryObj} from '@storybook/react'
import {fn} from '@storybook/test'

import {Switch} from '../components/ui/switch'

const meta = {
  title: 'ui/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {control: {disable: true}},
    asChild: {control: {disable: true}},
  },
  args: {onClick: fn()},
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    disabled: false,
  },
}
