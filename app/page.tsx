import { createClient } from '@/utils/supabase/server'
import HomepageTrendingCarousel from './components/HomepageTrendingCarousel'
import TrendingCarousel from './components/TrendingCarousel'

export const metadata = {
  title: 'Homepage - TofuTracker',
}

const supabase = createClient()

export default async function Home() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const res = await fetch(
    user
      ? `http://localhost:8080/api/trending/${user?.id}`
      : `http://localhost:8080/api/trending`,
    {
      cache: 'no-store',
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
