import AppHeader from '@/components/AppHeader'
import {createClient} from '@/utils/supabase/server'
import Button from '@/components/Button'
import {Home, Info} from 'lucide-react'
import Link from 'next/link'

const TimerNotFound = async () => {
	const supabase = await createClient()
	const {data: { user }} = await supabase.auth.getUser()

	return (
		<main className="flex flex-col justify-between gap-8">
			<AppHeader
				title="Timer Not Found"
				profileUrl={user!.user_metadata.avatar_url}
				backLink="/app"
			/>
			<div className="h-full text-7xl text-center uppercase flex flex-col gap-6 font-bold">
				<p className="text-yellow-400">
					Timer
				</p>
				<p className="">
					Not
				</p>
				<p className="">
					Found
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

export default TimerNotFound
