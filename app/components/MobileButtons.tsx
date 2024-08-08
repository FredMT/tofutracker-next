import getUser from '@/hooks/useUser'

async function getLibraryItem(user_id: string, itemId: string) {
  const res = await fetch(
    `http://localhost:3030/api/user-shows/${user_id}/${itemId}`,
    { method: 'GET', credentials: 'include' }
  )
  const data = await res.json()
  return data
}

export default async function MobileButtons({ itemId }: { itemId: string }) {
  const user = await getUser()
  let data
  user ? (data = await getLibraryItem(user.id, itemId)) : (data = [])

  return <div className="flex w-full"></div>
}
