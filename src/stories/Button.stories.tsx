import type {Meta, StoryObj} from '@storybook/react'
import {fn} from '@storybook/test'
import {MenuIcon} from 'lucide-react'

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
    size: {control: 'select', options: ['default', 'sm', 'icon']},
    variant: {control: 'select', options: ['default', 'outline', 'secondary', 'ghost', 'link', 'destructive']},
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
    disabled: false,
    loading: false,
    hideIcon: false,
  },
}

const variants: ButtonVariants['variant'][] = ['default', 'outline', 'secondary', 'ghost', 'destructive']

export const All: Story = {
  args: {
    children: 'Button',
    size: 'default',
    disabled: false,
  },
  render: (args) => (
    <div className='grid grid-cols-3 items-end gap-4'>
      {variants.map((variant) => (
        <Button {...args} key={variant} variant={variant} />
      ))}
    </div>
  ),
}

export const Icon: Story = {
  argTypes: {
    children: {control: {disable: true}},
  },
  args: {
    children: <MenuIcon className='h-12 w-12' />,
    variant: 'outline',
    size: 'icon',
    disabled: false,
    hideIcon: false,
  },
}
