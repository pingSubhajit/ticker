import logo from '@/public/logo.png'
import Image from 'next/image'
import Button from '@/components/Button'
import Link from 'next/link'
import {createClient} from '@/utils/supabase/server'
import {githubRepo} from '@/lib/constants'
import Separator from '@/components/Separator'

const AboutPage = async () => {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<main className="flex flex-col items-start justify-center gap-8">
			<header className="flex justify-between items-center w-full">
				<Link href="/"><Image src={logo} alt="Ticker logo" className="w-8 h-8"/></Link>
				{!user && <Link href="/auth/login">
					<Button variant="link">Login</Button>
				</Link>}
				{user && <Link href="/app">
					<Button variant="link">App</Button>
				</Link>}
			</header>

			<div>
				<h2 className="text-lg text-neutral-200 font-medium">Ticker: Long duration stopwatch</h2>
				<p className="mt-2 text-[15px] font-medium text-neutral-400 font-sans leading-relaxed">
					A small tool for creating stopwatch timers that can run for days, weeks, or even months. All synced
					in real-time across multiple devices. Uses simple algorithm and can sometimes drift by a one or two
					seconds.
				</p>
			</div>

			<div>
				<h2 className="text-lg text-neutral-200 font-medium">About</h2>
				<p className="mt-2 text-[15px] font-medium text-neutral-400 font-sans leading-relaxed">
					Built for personal usage, designed with personal preferences. The application is bare-featured with
					minimalistic design and functionality. Loads fast and animated appropriately. Mobile first design.
					No onboarding. No tracking. No ads, ever.
				</p>
			</div>

			<div>
				<h2 className="text-lg text-neutral-200 font-medium">Join</h2>
				<p className="mt-2 text-[15px] font-medium text-neutral-400 font-sans leading-relaxed">
					The product is free to use. However, no new features, bug fixes, or any meaningful support will be
					guaranteed. The project is open source and can be found
					on <a href={githubRepo} target="_blank"
					      className="text-yellow-400 hover:text-yellow-500 transition">
					GitHub
					</a>. Feel free to fork, modify and host your own version. No attribution required.
				</p>
			</div>

			<div>
				<h2 className="text-lg text-neutral-200 font-medium">Credits</h2>
				<p className="mt-2 text-[15px] font-medium text-neutral-400 font-sans leading-relaxed">
					Thank you <a href="https://dribbble.com/mattwojtas" target="_blank" className="text-yellow-400
					hover:text-yellow-500 transition">Matt Wojtaś</a> for letting me use his <a
						href="https://dribbble.com/shots/22286609--30-Mobile-App-Concept" target="_blank"
						className="text-yellow-400 hover:text-yellow-500 transition">design concept</a> as the base
					inspiration for this project.
				</p>
			</div>

			<Separator />

			<footer className="flex justify-between items-center w-full">
				<p className="mt-2 text-sm font-medium text-neutral-400 italic">v0.01</p>
				<p className="mt-2 text-sm font-medium text-neutral-400 text-right">Subhajit</p>
			</footer>
		</main>
	)
}

export default AboutPage
