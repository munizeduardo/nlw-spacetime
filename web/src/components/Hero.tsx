import Image from 'next/image'

import nlwLogo from '../assets/nlw-spacetime-logo.svg'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="space-y-5">
      <Image src={nlwLogo} alt="NLW Spacetime" />

      <div className="max-w-[420px] space-y-1">
        <h1 className="leading-tigh text-5xl font-bold text-gray-50">
          Your time capsule
        </h1>
        <p className="text-lg leading-relaxed">
          Save your memorable moments and (maybe) share them with the world!
        </p>
      </div>

      <Link
        href="/memories/new"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        SAVE A MEMORY
      </Link>
    </div>
  )
}