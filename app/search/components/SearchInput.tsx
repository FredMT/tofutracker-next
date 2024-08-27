'use client'

import { useState, useCallback, useRef } from 'react'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/hooks/useRouter'
import { useDebounce } from '@/hooks/useDebounce'
import { Separator } from '@/components/ui/separator'

export function SearchInput({ query }: { query: string }) {
  const [searchQuery, setSearchQuery] = useState(query)
  const form = useForm()
  const router = useRouter()

  const debouncedSearch = useDebounce((query: string) => {
    if (query.trim()) {
      router.push(
        `/search?query=${encodeURIComponent(query.trim())}&type=movies`
      )
    } else {
      router.push('/search')
    }
  }, 400)

  const handleClear = useCallback(() => {
    setSearchQuery('')
    debouncedSearch('')
    router.push('/search')
  }, [router, debouncedSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    debouncedSearch(value)
  }

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <>
                  <Input
                    placeholder="Search..."
                    {...field}
                    value={searchQuery}
                    onChange={(e) => {
                      field.onChange(e)
                      handleInputChange(e)
                    }}
                    className="border-0"
                  />
                  <Separator />
                </>
              </FormControl>
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleClear}
                  className="absolute right-3 top-[25%] -translate-y-1/2 hover:bg-transparent"
                >
                  <X className="size-6 text-gray-500" />
                </Button>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
