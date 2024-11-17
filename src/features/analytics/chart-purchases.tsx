'use client'

import {CartesianGrid, Line, LineChart, XAxis} from 'recharts'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '~/components/ui/card'
import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from '~/components/ui/chart'

const chartConfig = {
  count: {
    label: 'Purchases',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const formatDate = (value: string) => {
  const month = parseInt(value.split('-')[1] ?? '')
  const year = value.slice(2, 4)
  return `${month}/${year}`
}

type Props = {
  data: {date: string; total: number; count: number}[]
  total: number
}

export const ChartPurchases = ({data, total}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchases by month</CardTitle>
        <CardDescription>Total purchases: {total}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey='date' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={formatDate} />
            <ChartTooltip content={<ChartTooltipContent nameKey='date' />} labelFormatter={formatDate} />
            <Line
              dataKey='count'
              type='natural'
              stroke='var(--color-count)'
              strokeWidth={2}
              dot={{
                fill: 'var(--color-count)',
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='leading-none text-muted-foreground'>Showing only purchases in the system</div>
      </CardFooter>
    </Card>
  )
}
