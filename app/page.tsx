import { createClient } from '@/utils/supabase/server'
import HomepageTrendingCarousel from '@/app/components/HomepageTrendingCarousel'
import TrendingCarousel from '@/app/components/TrendingCarousel'
import getUser from '@/hooks/useUser'

export const metadata = {
  title: 'Homepage - TofuTracker',
}

export default async function Home() {
  const user = await getUser()

  const res = await fetch(
    user
      ? `http://localhost:8080/api/trending/${user.id}`
      : `http://localhost:8080/api/trending`,
    {
      next: { revalidate: 60 * 60 * 24 },
    }
  )
  const data = await res.json()

  return (
    <main className="flex min-h-dvh flex-col gap-y-6">
      <HomepageTrendingCarousel data={data} />
      <div className="space-y-6 p-6 xl:mx-40">
        <TrendingCarousel
          title="Trending Movies"
          items={data.movies}
          user={user}
        />

        <TrendingCarousel
          title="Trending TV Shows"
          items={data.tvShows}
          user={user}
        />

        <TrendingCarousel
          title="Trending Anime"
          items={data.anime}
          user={user}
        />
      </div>
    </main>
  )
}
