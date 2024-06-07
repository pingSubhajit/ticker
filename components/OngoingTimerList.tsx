'use client'

import {Timer} from '@/components/TimerList'
import {useState} from 'react'
import TimersEmpty from '@/components/TimersEmpty'
import dynamic from 'next/dynamic'
import {CounterLoading} from '@/components/Counter'

const TimerList = dynamic(() => import('@/components/TimerList'), {
	ssr: false,
	loading: () => <ul className="w-full mt-4 flex flex-col gap-3" role="list">
		<CounterLoading variant="list" />
		<CounterLoading variant="list" />
		<CounterLoading variant="list" />
	</ul>
})

const OngoingTimerList = ({ ongoingTimers }: { ongoingTimers: Timer[] }) => {
	const [timers, setTimers] = useState<Timer[]>(ongoingTimers)

	return (
		timers.length > 0 ? <div>
			<p className="text-sm opacity-60">Ongoing timers</p>

			<TimerList
				timers={timers}
				setTimers={setTimers}
				className="mt-4"
				supabaseSubscribeConfig={{
					event: '*',
					schema: 'public',
					table: 'timer',
				}}
				channelName="TimerList:Ongoing"
				filter={(timer) => timer.ended_at === null}
			/>
		</div> : timers.length === 0 && <TimersEmpty />
	)
}

export default OngoingTimerList
