import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import Link from 'next/link'

export default function SearchButton() {
  return (
    <Button variant="ghost" asChild>
      <Link href="/search">
        <Search className="size-[1.2rem]" />
      </Link>
    </Button>
  )
}
