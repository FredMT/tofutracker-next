export default async function Title({ title }: { title: string }) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return (
    <div className="text-xl font-semibold mt-6 sm:mt-0 sm:text-[30px] sm:leading-[36px]">
      {title}
    </div>
  );
}
