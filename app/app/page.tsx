import {createClient} from '@/utils/supabase/server'
import {redirect} from 'next/navigation'
import TimerList, {Timer} from '@/components/TimerList'
import AppHeader from '@/components/AppHeader'
import Button from '@/components/Button'
import {Plus} from 'lucide-react'
import {DateTime} from 'luxon'
import Separator from '@/components/Separator'

const AppHome = async () => {
	const supabase = createClient()

	const {data: { user }} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/')
	}

	const {data: timers, error} = await supabase.from('timer').select('*') as unknown as { data: Timer[], error: any }

	return (
		<main className="flex flex-col gap-16">
			<AppHeader title="Ticker" profileUrl={user.user_metadata.avatar_url} />

			<div>
				<p className="text-sm opacity-60">
					{DateTime.fromMillis(Date.now()).toFormat('LLL dd\', \'EEEE')}
				</p>
				<div className="flex justify-between items-end mt-4">
					<h1 className="flex flex-col gap-2 text-5xl">
						<span className="text-yellow-400">Welcome</span>
						<span className="text-7xl truncate">{user.user_metadata.name.split(' ')[0]}</span>
					</h1>

					<Button size="icon" className="p-6">
						<Plus className="fill-neutral-950 w-6 h-6" strokeWidth={3} />
					</Button>
				</div>
			</div>

			<Separator />

			<div>
				<p className="text-sm opacity-60">Ongoing timers</p>
				<TimerList timers={timers} className="mt-4" />
			</div>
		</main>
	)
}

export default AppHome
