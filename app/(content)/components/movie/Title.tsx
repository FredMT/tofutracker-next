export default async function Title({ title }: { title: string }) {
  return (
    <div className="text-xl font-semibold sm:mt-0 sm:text-[30px] sm:leading-[36px]">
      <div>{title}</div>
    </div>
  )
}
