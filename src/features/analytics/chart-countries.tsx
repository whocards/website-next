'use client'

import {Bar, BarChart, CartesianGrid, LabelList, XAxis} from 'recharts'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '~/components/ui/card'
import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from '~/components/ui/chart'
import {useIsMobile} from '~/hooks/use-mobile'

const chartConfig = {
  country: {
    label: 'Country',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const CustomTick = ({x, y, payload}: {x: number; y: number; payload: {value: string}}) => {
  const lines = payload.value.split(' ') // Splits the label (optional, modify as needed)
  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, index) => (
        <text
          key={index}
          x={0}
          y={0}
          dy={index * 12} // Vertical spacing between lines
          textAnchor='middle'
          className='text-[8px] text-muted-foreground lg:text-xs'
        >
          {line}
        </text>
      ))}
    </g>
  )
}

type Props = {
  data: {country: string; count: number}[]
}

export const ChartCountries = ({data}: Props) => {
  const isMobile = useIsMobile()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchases by country</CardTitle>
        <CardDescription>Total purchases: {data.reduce((acc, c) => acc + c.count, 0)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='country'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              textAnchor='middle'
              interval={isMobile ? 1 : 0}
              tick={(props) => <CustomTick {...props} />}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey='count' fill='var(--color-country)' radius={8}>
              <LabelList position='top' offset={12} className='fill-foreground' fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='leading-none text-muted-foreground'>Showing only purchases in the system</div>
      </CardFooter>
    </Card>
  )
}
