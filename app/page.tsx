import HomepageTrendingCarousel from './components/HomepageTrendingCarousel'
import HomepageTrendingCardCarousel from './components/HomepageTrendingCardCarousel'

export const metadata = {
  title: 'Homepage - TofuTracker',
}

export default async function Home() {
  const res = await fetch(
    'https://tofutracker-3pt5y.ondigitalocean.app/api/trending'
  )
  const data = await res.json()
  return (
    <main className="flex min-h-dvh flex-col gap-y-6">
      <HomepageTrendingCarousel fetchedData={data} />

      <div className="space-y-6 p-6">
        <HomepageTrendingCardCarousel data={data} />
      </div>
    </main>
  )
}
