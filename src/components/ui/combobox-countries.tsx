'use client'

import * as React from 'react'
import {Check, ChevronDown, ChevronUp} from 'lucide-react'

import {cn} from '~/lib/utils'
import {Button} from '~/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger} from '~/components/ui/popover'

import countries from '~/assets/data/countries.json'

const countriesMap = Object.fromEntries(countries.map((country) => [country.iso2, country.name]))

const getCountryLabel = (iso2: string) => {
  const country = countries.find((country) => country.iso2 === iso2)
  if (!country) return null
  return (
    <div className='flex items-center gap-2'>
      <div>{country.emoji}</div>
      <div className='text-sm leading-tight'>{country.name}</div>
    </div>
  )
}

type ComboboxProps = {
  value: string
  setValue: (value: string) => void
}

export const ComboboxCountries = ({value, setValue}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false)

  const Icon = open ? ChevronUp : ChevronDown

  return (
    <>
      <input
        value={value}
        autoComplete='country'
        className='fixed -right-[100vw]'
        onChange={(e) => {
          const {value: newValue} = e.target
          if (Object.keys(countriesMap).includes(newValue)) {
            setValue(newValue)
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
            {value ? getCountryLabel(value) : 'Select country...'}
            <Icon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align='center'
          className='mx-6 w-full max-w-[calc(100vw-3.75rem)] p-0 md:mx-0 md:max-w-[19.5rem]'
        >
          <Command
            filter={(value, search) => (countriesMap[value]?.toLowerCase().includes(search.toLowerCase()) ? 1 : 0)}
          >
            <CommandInput placeholder='Search country...' />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {value && (
                  <CommandItem
                    key={value}
                    value={value}
                    onSelect={() => {
                      setOpen(false)
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', value === value ? 'opacity-100' : 'opacity-0')} />
                    {getCountryLabel(value)}
                  </CommandItem>
                )}
                <CommandSeparator />
                {countries.map((country) =>
                  country.iso2 === value ? null : (
                    <CommandItem
                      key={country.id}
                      value={country.iso2}
                      onSelect={(value) => {
                        setValue(value)
                        setOpen(false)
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', value === country.iso2 ? 'opacity-100' : 'opacity-0')} />
                      {getCountryLabel(country.iso2)}
                    </CommandItem>
                  )
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
