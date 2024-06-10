'use client'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SearchButton() {
  const router = useRouter()
  return (
    <Button variant="secondary" onClick={() => router.push('/search')}>
      <Search className="mr-2 size-[1.2rem]" />
      Search
    </Button>
  )

  return null
}
