'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaFigma, FaTerminal } from 'react-icons/fa'
import { Code, Layers2 } from 'lucide-react'

export default function Footer() {
  return (
    <div className="z-50 mx-6 flex flex-col gap-y-4">
      <div className="flex w-full justify-around gap-x-6 px-6 xl:px-40">
        <Link
          href="https://bento.me/notacookiefactory"
          className="min-w-[45%]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="flex w-full">
            <FaFigma className="mr-[10px] h-4 w-4" /> Designer{' '}
            <Layers2 className="ml-[10px] hidden h-4 w-4 sm:flex" />
          </Button>
        </Link>
        <Link
          href="https://github.com/FredMT"
          className="min-w-[45%]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="flex w-full">
            <FaTerminal className="mr-[10px] h-4 w-4" /> Developer
            <Code className="ml-[10px] hidden h-4 w-4 sm:flex" />
          </Button>
        </Link>
      </div>
      <div className="w-full">
        <p className="select-none text-center font-syne text-[8vw] font-semibold uppercase not-italic leading-[normal]">
          TOFUTRACKER
        </p>
      </div>
    </div>
  )
}
