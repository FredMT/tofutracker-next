import HomepageTrendingMovieCarousel from './components/HomepageTrendingMovieCarousel'
import HomepageTrendingMovieCardCarousel from './components/HomepageTrendingMovieCardCarousel'

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col gap-y-6">
      <HomepageTrendingMovieCarousel />

      <div className="space-y-6 p-6">
        <HomepageTrendingMovieCardCarousel />
      </div>
    </main>
  )
}
