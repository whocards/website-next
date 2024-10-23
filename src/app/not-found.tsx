import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='grid h-screen place-content-center bg-background px-4'>
      <div className='text-center'>
        <h1 className='mt-6 text-2xl font-bold tracking-tight sm:text-4xl'>Uh-oh!</h1>

        <p className='mt-4 text-muted-foreground'>We can&apos;t find that page.</p>
        <Link href='/'>Go back to site</Link>
      </div>
    </div>
  )
}
