'use client'

import {useState} from 'react'
import {Pencil, Check} from 'lucide-react'
import {Button} from '~/components/ui/button'
import {Input} from '~/components/ui/input'
import {Label} from '~/components/ui/label'
import {UserAvatar} from '~/components/user-avatar'
import {hasRole} from '~/lib/permissions'
import type {AuthUser} from '~/types/db'
import {api} from '~/trpc/react'
import {useToast} from '~/hooks/use-toast'

interface ProfileFormProps {
  initialData: AuthUser
}

export function ProfileForm({initialData}: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(initialData.name ?? '')
  const [email, setEmail] = useState(initialData.email ?? '')
  const {toast} = useToast()

  const requestAdminAccessMutation = api.users.requestAdminAccess.useMutation()
  const getById = api.users.getById.useQuery(initialData.id, {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const user = getById.data

  if (!user) return null

  const handleEditToggle = () => {
    if (isEditing) {
      // Here you would typically save the changes to a backend
      console.log('Saving profile:', {name, email})
    }
    setIsEditing(!isEditing)
  }

  const requestAdminAccess = async () => {
    requestAdminAccessMutation.mutate()
    await getById.refetch()
    toast({
      title: 'Admin access requested',
      description: 'You will be notified when your access is approved',
    })
  }

  const canRequestAdminAccess = hasRole(user, 'user', true)

  return (
    <div className='grid grid-cols-[6rem_15rem] gap-x-10 gap-y-4'>
      <UserAvatar image={user.image} name={name} className='h-24 w-24 self-center' />
      <div className='flex flex-col gap-2'>
        <Label htmlFor='name'>Name</Label>
        <Input
          id='name'
          className='mb-2'
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEditing}
        />
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} />
      </div>
      <Button onClick={handleEditToggle} variant={isEditing ? 'default' : 'outline'} disabled>
        {isEditing ? (
          <>
            Save <Check className='h-4 w-4' />
          </>
        ) : (
          <>
            Edit <Pencil className='h-4 w-4' />
          </>
        )}
        <span className='sr-only'>{isEditing ? 'Save' : 'Edit'}</span>
      </Button>
      {canRequestAdminAccess && (
        <Button variant='secondary' disabled={user.requestedAdminAccess} onClick={requestAdminAccess}>
          Request{user.requestedAdminAccess ? 'ed' : ''} Admin Access
        </Button>
      )}
    </div>
  )
}
