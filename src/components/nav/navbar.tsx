import Link from 'next/link'
import {Button} from '~/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetVisuallyHidden,
} from '~/components/ui/sheet'
import {CurrentUserAvatar} from '../user-avatar'
import {UserMenu} from './user-menu'
import Logo from '~/assets/icons/logo.svg'
import {hasPermission} from '~/lib/permissions'
import {auth} from '~/server/auth'
import {MenuIcon} from 'lucide-react'

const links = [
  {href: '/', label: 'Home'},
  // {href: '/about', label: 'About'},
  // {href: '/services', label: 'Services'},
  // {href: '/contact', label: 'Contact'},
]

const adminLinks = [...links, {href: '/wc', label: 'Admin'}]

export const Navbar = async () => {
  const session = await auth()

  const useLinks = hasPermission(session?.user, 'portal', 'view') ? adminLinks : links

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950'>
      <div className='container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6'>
        <Link href='/' className='flex items-center gap-2'>
          <Logo className='h-8' />
          <span className='sr-only'>WhoCards</span>
        </Link>
        <nav className='hidden flex-1 items-center justify-end gap-6 pr-6 text-sm font-medium md:flex'>
          {useLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className='flex items-center gap-4'>
          {/* <div className='hidden items-center gap-2 text-sm font-medium md:flex'>
            <PhoneIcon className='h-5 w-5 text-gray-500 dark:text-gray-400' />
            <span className='text-gray-500 dark:text-gray-400'>123-456-7890</span>
          </div> */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='rounded-full'>
                <SearchIcon className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                <span className='sr-only'>Search</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[300px] p-4'>
              <div className='relative'>
                <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
                <Input type='search' placeholder='Search...' className='w-full pl-8' />
              </div>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <UserMenu side='top' sideOffset={16}>
            <CurrentUserAvatar className='h-8 w-8 rounded-full transition-opacity data-[state=open]:opacity-50' />
          </UserMenu>
          <Sheet>
            <SheetVisuallyHidden>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Main navigation menu</SheetDescription>
            </SheetVisuallyHidden>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='rounded-full md:hidden'>
                <MenuIcon className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='md:hidden'>
              <div className='grid gap-4 p-4'>
                {useLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className='text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
