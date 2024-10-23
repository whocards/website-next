'use client'

import {useMediaQuery} from '~/hooks/use-media-query'

import {Button} from './ui/button'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from './ui/dialog'
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle} from './ui/drawer'

export function ResponsiveDialog({
  children,
  isOpen,
  isEditOpen,
  title,
  description,
}: {
  children: React.ReactNode
  isOpen: boolean
  isEditOpen?: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  description?: string
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={isEditOpen}>
        <DialogContent className=''>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={isEditOpen}>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DrawerHeader>
        <div className='p-4'>{children}</div>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
