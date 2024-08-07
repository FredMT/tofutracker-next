import HomepageTrendingCarousel from '@/app/components/HomepageTrendingCarousel'
import TrendingCarousel from '@/app/components/TrendingCarousel'
import { User } from 'lucia'
import { getCurrentUser } from '@/lib/session'

export const metadata = {
  title: 'Homepage - TofuTracker',
}

async function getTrendingData(user: User | undefined) {
  const body = user ? JSON.stringify({ user_id: user.id }) : null
  const res = await fetch('http://localhost:3030/api/trending/items', {
    method: 'POST',
    body: body,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    next: { tags: ['trending'] },
    cache: 'no-store',
    credentials: 'include',
  })

  return await res.json()
}

export default async function Home() {
  const luciaUser = await getCurrentUser()
  const trendingData = await getTrendingData(luciaUser)

  return (
    <main className="flex min-h-dvh flex-col gap-y-6">
      <HomepageTrendingCarousel data={trendingData} />
      <div className="space-y-6 p-6 xl:mx-40">
        <TrendingCarousel
          title="Trending Movies"
          items={trendingData.movies}
          user={luciaUser}
        />

        <TrendingCarousel
          title="Trending TV Shows"
          items={trendingData.tv}
          user={luciaUser}
        />

        <TrendingCarousel
          title="Trending Anime"
          items={trendingData.anime}
          user={luciaUser}
        />
      </div>
    </main>
  )
}
