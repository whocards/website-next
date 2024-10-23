import type {Meta, StoryObj} from '@storybook/react'
import {fn} from '@storybook/test'

import {Checkbox} from '../components/ui/checkbox'

const meta = {
  title: 'ui/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    asChild: {control: {disable: true}},
  },
  args: {onClick: fn()},
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    disabled: false,
    checked: false,
  },
}
