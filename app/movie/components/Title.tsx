export default async function Title({ title }: { title: string }) {
  return (
    <div className="mt-6 text-xl font-semibold sm:mt-0 sm:text-[30px] sm:leading-[36px]">
      {title}
    </div>
  )
}
