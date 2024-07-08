'use client'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useRouter } from '@/hooks/useRouter'

export default function SearchButton() {
  const router = useRouter()
  return (
    <Button variant="secondary" onClick={() => router.push('/search')}>
      <Search className="size-[1.2rem]" />
    </Button>
  )

  return null
}
