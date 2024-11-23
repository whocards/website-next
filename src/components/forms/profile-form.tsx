'use client'

import {useState} from 'react'
import {Pencil, Check} from 'lucide-react'
import {Button} from '~/components/ui/button'
import {Input} from '~/components/ui/input'
import {Label} from '~/components/ui/label'
import type {User} from 'next-auth'
import {UserAvatar} from '~/components/user-avatar'

interface ProfileFormProps {
  user: User
}

export function ProfileForm({user}: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name ?? '')
  const [email, setEmail] = useState(user.email ?? '')

  const handleEditToggle = () => {
    if (isEditing) {
      // Here you would typically save the changes to a backend
      console.log('Saving profile:', {name, email})
    }
    setIsEditing(!isEditing)
  }

  return (
    <div className='grid grid-cols-[6rem_15rem] gap-2'>
      <UserAvatar image={user.image} name={name} className='h-24 w-24 self-center' />
      <div className='flex flex-col items-center gap-2'>
        <div>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
          />
        </div>
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
    </div>
  )
}
