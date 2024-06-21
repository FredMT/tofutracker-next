import Image from 'next/image'
import SignUpCard from './SignUpCard'

export default async function SignUp({
  searchParams,
}: {
  searchParams: { message: string; from: string }
}) {
  let bg_img
  let interspersedBackdropPaths
  if (searchParams.from) {
    const item_type = searchParams.from.split('/')[0]
    const item_id = searchParams.from.split('/')[1]
    bg_img = await fetch(
      `http://localhost:8080/api/getbackdropimage/${item_type}/${item_id}`
    ).then((res) => res.json())
  } else {
    const trending = await fetch('http://localhost:8080/api/trending', {
      next: { revalidate: 86400 },
    }).then((res) => res.json())

    interspersedBackdropPaths = trending.movies
      .map((movie: any, index: number) => [
        movie.backdrop_path,
        trending.tvShows?.[index]?.backdrop_path,
      ])
      .flat()
      .filter(Boolean)
  }

  return (
    <>
      {searchParams.from ? (
        <Image
          src={`https://image.tmdb.org/t/p/original${bg_img}`}
          alt="SignUp Background"
          fill
          className="animate-fade-in-50 absolute z-0 object-cover object-center opacity-70 duration-500 animate-in dark:opacity-30"
        />
      ) : (
        <Image
          src={`https://image.tmdb.org/t/p/original${interspersedBackdropPaths[Math.floor(Math.random() * interspersedBackdropPaths.length)]}`}
          alt="SignUp Background"
          fill
          className="animate-fade-in-50 absolute z-0 object-cover object-center opacity-70 duration-500 animate-in dark:opacity-30"
        />
      )}
      <div className="my-20 flex justify-center">
        <div className="z-10 mt-20 flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
          <SignUpCard />
        </div>
      </div>
    </>
  )
}
