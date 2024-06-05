import {createClient} from '@/utils/supabase/server'
import TimerList, {Timer} from '@/components/TimerList'
import AppHeader from '@/components/AppHeader'
import {DateTime} from 'luxon'
import Separator from '@/components/Separator'
import NewTimerButton from '@/components/NewTimerButton'

const AppHome = async () => {
	const supabase = createClient()

	const {data: { user }} = await supabase.auth.getUser()

	const {data: timers, error} = await supabase.from('timer').select('*').is('ended_at', null)
		.order('created_at', { ascending: false }) as unknown as { data: Timer[], error: any }

	const {data: oldTimers, error: oldTimersError} = await supabase.from('timer').select('*').not('ended_at', 'is', null)
		.order('created_at', { ascending: false }) as unknown as { data: Timer[], error: any }

	return (
		<main className="flex flex-col gap-16">
			<AppHeader title="Ticker" profileUrl={user!.user_metadata.avatar_url} />

			<div>
				<p className="text-sm opacity-60">
					{DateTime.fromMillis(Date.now()).toFormat('LLL dd\', \'EEEE')}
				</p>
				<div className="flex justify-between items-end mt-4 gap-4">
					<h1 className="flex flex-col gap-2 truncate">
						<span className="text-yellow-400 text-4xl">Welcome</span>
						<span className="text-6xl truncate font-medium">{user!.user_metadata.name.split(' ')[0]}</span>
					</h1>

					<NewTimerButton />
				</div>
			</div>

			<Separator />

			<div>
				<p className="text-sm opacity-60">Ongoing timers</p>
				<TimerList initialTimers={timers} className="mt-4" />
			</div>

			<Separator />

			<div>
				<p className="text-sm opacity-60">Old timers</p>
				<TimerList initialTimers={oldTimers} className="mt-4" />
			</div>
		</main>
	)
}

export default AppHome
