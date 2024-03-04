import { Card } from "@/components/ui/card";
import React from "react";

type CrewMember = {
  job: string;
  name: string;
  id: number;
};

export default async function Details({
  crew,
  budget,
  revenue,
}: {
  crew: CrewMember[];
  budget: number;
  revenue: number;
}) {
  const movieCredits = crew.filter(
    (person) =>
      person.job === "Director" ||
      person.job === "Writer" ||
      person.job === "Story" ||
      person.job === "Screenplay" ||
      person.job === "Novel"
  );

  console.log(movieCredits);

  const sortedMovieCredits = movieCredits.sort((a, b) => {
    if (a.job === "Director") return -1;
    if (b.job === "Director") return 1;
    return 0;
  });

  await new Promise((resolve) => setTimeout(resolve, 1200));
  return (
    <Card className="border-x-0 border-t-0 rounded-none pb-8">
      <div className="grid grid-cols-[75px_auto] gap-y-2 lg:grid-cols-[75px_1fr_75px_1fr] lg:gap-y-4 mt-4">
        {Object.entries(
          sortedMovieCredits.reduce(
            (acc: { [key: string]: string[] }, credit) => {
              (acc[credit.job] = acc[credit.job] || []).push(credit.name);
              return acc;
            },
            {}
          )
        ).map(([job, names], index) => (
          <React.Fragment key={index}>
            <div className="text-[14px] text-muted-foreground font-medium leading-[24px]">
              {job}
            </div>
            <div className="flex flex-col">
              {names.slice(0, 5).map((name, nameIndex) => (
                <p
                  key={nameIndex}
                  className="text-[14px]  font-medium leading-[24px] ml-6"
                >
                  {name}
                </p>
              ))}
            </div>
          </React.Fragment>
        ))}
        <div className="text-[14px] text-muted-foreground font-medium leading-[24px]">
          Budget
        </div>
        <div className="text-[14px]  font-medium leading-[24px] ml-6">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }).format(budget)}
        </div>
        <div className="text-[14px] text-muted-foreground font-medium leading-[24px]">
          Revenue
        </div>
        <div className="text-[14px]  font-medium leading-[24px] ml-6">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }).format(revenue)}
        </div>
      </div>
    </Card>
  );
}
