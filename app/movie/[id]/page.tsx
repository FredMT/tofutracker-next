import type { Metadata } from "next";

export const generateMetadata = ({ params }: Props): Metadata => {
  const title = params.id.split("-").slice(1).join(" ").replace(/%20/g, " ");
  return {
    title: `${title} - Tofutracker`,
  };
};

type Props = {
  params: {
    id: string;
  };
};

export default function Movie({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="h-[320px] bg-slate-400 animate-pulse"></div>
      <div className="flex justify-center">
        <div className="w-[124px] h-[186px] bg-slate-400 animate-pulse"></div>
      </div>
      <div className="flex justify-center">
        <div className="w-[60%] h-[24px] bg-slate-400 animate-pulse"></div>
      </div>
      <div className="flex justify-center">
        <div className="w-[80%] h-[24px] bg-slate-400 animate-pulse"></div>
      </div>
    </div>
  );
}
