import HomepageTrendingCarousel from './components/HomepageTrendingCarousel'
import HomepageTrendingCardCarousel from './components/HomepageTrendingCardCarousel'

export const metadata = {
  title: 'Homepage - TofuTracker',
}

export default async function Home() {
  const res = await fetch('http://localhost:8080/api/trending', {
    next: { revalidate: 86400 },
  })
  const data = await res.json()

  return (
    <main className="flex min-h-dvh flex-col gap-y-6">
      <HomepageTrendingCarousel data={data} />
      <div className="space-y-6 p-6 xl:mx-40">
        <HomepageTrendingCardCarousel data={data} />
      </div>
    </main>
  )
}
