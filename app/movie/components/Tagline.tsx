import React from "react";

export default async function Tagline({ tagline }: { tagline: string }) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return <div className="mt-2">{tagline}</div>;
}
