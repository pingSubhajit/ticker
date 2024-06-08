'use client'

import Link from 'next/link'
import Button from '@/components/Button'
import {Home, RotateCw} from 'lucide-react'

const Error = () => {
	return (
		<main className="flex flex-col justify-between gap-8">
			<h2 className="h-10 flex items-center justify-center border border-neutral-50/25 w-full rounded-full text-yellow-400">
				Nasty Error
			</h2>

			<div className="flex flex-col items-center justify-center gap-2 text-center">
				<h2 className="font-semibold text-8xl text-yellow-400">Oops</h2>
				<h1 className="font-medium text-3xl">This is awkward</h1>
				<p className="text-sm opacity-60 max-w-96 text-balance lg:text-center lg:mx-auto lg:max-w-[600px]">
					Seems like we've hit a big runtime error. Sorry... i guess (for the inconvenience). Try reloading
					although that probably would not work either.
				</p>
			</div>

			<div className="flex items-center mt-8 gap-2 justify-center">
				<Button role="link" size="icon" variant="secondary" onClick={() => location.reload()}>
					<span className="sr-only">Try again</span>
					<RotateCw className="w-8 h-8" aria-hidden/>
				</Button>

				<Link href="/app" aria-hidden>
					<Button size="icon" >
						<span className="sr-only">Back to home (if that works)</span>
						<Home className="w-8 h-8" aria-hidden/>
					</Button>
				</Link>
			</div>
		</main>
	)
}

export default Error