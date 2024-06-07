import stopwatch from '@/public/stopwatch.svg'
import Image from 'next/image'
import Button from '@/components/Button'
import {createClient} from '@/utils/supabase/server'
import {redirect} from 'next/navigation'
import Link from 'next/link'
import WaveDecoration from '@/components/WaveDecoration'

export default async function Home() {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (user) {
		return redirect('/app')
	}

	return (
		<main className="flex flex-col items-start justify-end gap-8 lg:gap-16 !md:py-24 lg:justify-center">
			<div>
				<h1 className="flex flex-col text-5xl leading-[1.15] lg:flex-row lg:flex-wrap lg:justify-center">
					<span className="text-yellow-400 whitespace-nowrap">Measure</span>
					<span><span className="italic whitespace-nowrap">time</span> <span
						className="underline decoration-yellow-400 whitespace-nowrap">of your</span></span>
					<span className="font-semibold whitespace-nowrap">life events</span>
				</h1>

				<p className="mt-8 text-sm opacity-60 max-w-96 text-balance lg:text-center lg:mx-auto lg:max-w-[600px]">
					Measure the duration of any situation, event, occurrences like any event that goes on for multiple
					hours or days on end
				</p>
			</div>

			<Image src={stopwatch} alt="Stopwatch image used for illustrative purposes"
			       className="mt-8 mx-auto max-w-48"/>

			<div className="flex flex-col gap-2 items-center lg:flex-row w-full">
				<Link href="/auth/login" className="w-full"><Button size="full">Get started</Button></Link>
				<Link href="/about" className="w-full">
					<Button size="full" variant="secondary">About Ticker and the creator</Button>
				</Link>
			</div>

			<footer className="flex justify-between items-center w-full lg:absolute left-0 bottom-4 lg:px-8">
				<a href="/privacy" target="_blank" className="text-yellow-100 hover:text-yellow-500 transition opacity-80">
					<p className="mt-2 text-sm font-medium text-right">Privacy</p>
				</a>
				<a href="/terms" target="_blank" className="text-yellow-100 hover:text-yellow-500 transition opacity-80">
					<p className="mt-2 text-sm font-medium text-right">Terms</p>
				</a>
			</footer>

			<WaveDecoration double={true}/>
		</main>
	)
}
