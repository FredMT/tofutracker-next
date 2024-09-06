import React from 'react'

export default async function Tagline({ tagline }: { tagline: string }) {
  return <div className="mt-2">{tagline}</div>
}
