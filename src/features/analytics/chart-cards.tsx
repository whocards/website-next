'use client'

import * as React from 'react'
import {useMemo} from 'react'
import {Label, LabelList, Pie, PieChart} from 'recharts'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '~/components/ui/card'
import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from '~/components/ui/chart'

const chartConfig = {
  quantity: {
    label: 'Quantity',
  },
  '1': {
    label: 'Gift One',
    color: 'hsl(var(--chart-1))',
  },
  '2': {
    label: 'Friends',
    color: 'hsl(var(--chart-2))',
  },
  '5': {
    label: 'Community',
    color: 'hsl(var(--chart-3))',
  },
  '12': {
    label: 'Super Spreader',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig

type Props = {
  data: {quantity: number; count: number; total: number}[]
}

export const ChartCards = ({data}: Props) => {
  const totalDecks = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.total, 0)
  }, [data])

  const chartData = useMemo(() => data.map((d) => ({...d, fill: `var(--color-${d.quantity})`})), [data])

  return (
    <Card className='flex flex-col'>
      <CardHeader className='pb-0'>
        <CardTitle>Purchases by quantity</CardTitle>
        <CardDescription>Total decks sold: {totalDecks}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[450px]'>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent className='w-40' hideLabel />} />
            <Pie data={chartData} dataKey='total' nameKey='quantity'>
              <LabelList
                dataKey='quantity'
                className='fill-current font-bold'
                stroke='none'
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='leading-none text-muted-foreground'>Showing only purchases in the system</div>
      </CardFooter>
    </Card>
  )
}
