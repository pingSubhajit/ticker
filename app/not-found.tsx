import Button from '@/components/Button'
import {Home, Info} from 'lucide-react'
import Link from 'next/link'

const NotFound = async () => {
	return (
		<main className="flex flex-col justify-between gap-8">
			<h2 className="h-10 flex items-center justify-center border border-neutral-50/25 w-full
			rounded-full text-yellow-400">
				404 Error
			</h2>

			<div className="h-full text-7xl text-center uppercase flex flex-col gap-6 font-bold">
				<p className="text-yellow-400">
					Wrong
				</p>
				<p className="">
					Page
				</p>
				<p className="">
					Deer 🦌
				</p>
			</div>

			<div className="flex items-center mt-8 gap-2 justify-center">
				<Link href="/app" aria-hidden>
					<Button role="link" size="icon">
						<span className="sr-only">Back to home</span>
						<Home className="w-8 h-8" aria-hidden />
					</Button>
				</Link>

				<Link href="/about" aria-hidden>
					<Button size="icon" variant="secondary">
						<span className="sr-only">About Ticker</span>
						<Info className="w-8 h-8" aria-hidden />
					</Button>
				</Link>
			</div>
		</main>
	)
}

export default NotFound
