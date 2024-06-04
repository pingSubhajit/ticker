import stopwatch from '@/public/stopwatch.svg'
import Image from 'next/image'
import Button from '@/components/Button'
import {createClient} from '@/utils/supabase/server'
import {redirect} from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (user) {
		return redirect('/app')
	}

	return (
		<main className="flex min-h-svh w-screen mx-auto max-w-[700px] flex-col items-start justify-end p-8 gap-8">
			<h1 className="flex flex-col text-5xl leading-[1.15] lg:flex-row lg:flex-wrap">
				<span className="text-yellow-400 whitespace-nowrap">Measure</span>
				<span><span className="italic whitespace-nowrap">time</span> <span
					className="underline decoration-yellow-400 whitespace-nowrap">of your</span></span>
				<span className="font-semibold whitespace-nowrap">life events</span>
			</h1>

			<p className="text-sm opacity-60 max-w-96 text-balance">
				Measure the duration of any situation, event, occurrences like any event that goes on for multiple
				hours or days on end
			</p>

			<Image src={stopwatch} alt="Stopwatch image used for illustrative purposes"
			       className="mt-8 mx-auto max-w-48"/>

			<div className="space-y-2 w-full lg:flex lg:items-center lg:gap-2 lg:space-y-0">
				<Link href="/auth/login" className="w-full"><Button size="full">Get started</Button></Link>
				<Button size="full" variant="secondary">About Ticker and the creator</Button>
			</div>
		</main>
	)
}
