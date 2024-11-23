import type {LucideIcon} from 'lucide-react'
import Link from 'next/link'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '~/components/ui/card'
import {cn} from '~/lib/utils'
import {BarChart3, ShoppingCart, Truck, Users} from 'lucide-react'

const cards = [
  {title: 'Analytics', icon: BarChart3, href: '/wc/analytics', description: 'View detailed analytics and insights'},
  {title: 'Purchases', icon: ShoppingCart, href: '/wc/purchases', description: 'Manage and track customer purchases'},
  {title: 'Shipments', icon: Truck, href: '/wc/shipments', description: 'Monitor and update shipment statuses'},
  {title: 'Users', icon: Users, href: '/wc/users', description: 'Manage user accounts and permissions'},
]

interface DashboardCardProps {
  title: string
  icon: LucideIcon
  href: string
  description: string
  className?: string
}

export function DashboardCard({title, icon: Icon, href, description, className}: DashboardCardProps) {
  return (
    <Card className={cn('transition-all hover:shadow-lg', className)}>
      <Link href={href}>
        <CardHeader className='flex flex-row items-center gap-4 space-y-0 p-6'>
          <Icon className='h-8 w-8 text-muted-foreground lg:h-16 lg:w-16' />
          <div className='flex flex-col justify-between'>
            <CardTitle className='text-sm font-medium md:text-lg lg:text-xl'>{title}</CardTitle>
            <CardDescription className='text-sm text-muted-foreground md:text-base lg:text-lg'>
              {description}
            </CardDescription>
          </div>
        </CardHeader>
      </Link>
    </Card>
  )
}

export default function AnalyticsPage() {
  return (
    <>
      <h1 className='text-3xl'>Dashboards</h1>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-6'>
        {cards.map((card) => (
          <DashboardCard key={card.href} {...card} />
        ))}
      </div>
    </>
  )
}
