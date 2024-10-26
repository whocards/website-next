import type {Meta, StoryObj} from '@storybook/react'
import {fn} from '@storybook/test'

import {Button, type ButtonVariants} from '../components/ui/button'

const meta = {
  title: 'ui/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {control: 'text'},
    asChild: {control: {disable: true}},
    size: {control: 'select'},
  },
  args: {onClick: fn()},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
}

const variants: ButtonVariants['variant'][] = ['default', 'outline', 'secondary', 'ghost', 'link', 'destructive']

export const All: Story = {
  args: {
    children: 'Button',
    size: 'default',
    disabled: false,
  },
  render: (args) => (
    <div className='grid grid-cols-3 gap-4'>
      {variants.map((variant) => (
        <Button {...args} key={variant} variant={variant} />
      ))}
    </div>
  ),
}
