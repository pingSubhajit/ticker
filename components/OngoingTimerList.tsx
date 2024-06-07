'use client'

import {Timer} from '@/components/TimerList'
import {useState} from 'react'
import TimersEmpty from '@/components/TimersEmpty'
import dynamic from 'next/dynamic'
import {CounterLoading} from '@/components/Counter'
import {cn} from '@/lib/utils'

const TimerListWithLoading = dynamic(() => import('@/components/TimerList'), {
	ssr: false,
	loading: () => <ul className="w-full mt-4 flex flex-col gap-3" role="list">
		<CounterLoading variant="list" />
		<CounterLoading variant="list" />
		<CounterLoading variant="list" />
	</ul>
})

const TimerListWithoutLoading = dynamic(() => import('@/components/TimerList'), {ssr: false})

const OngoingTimerList = ({ ongoingTimers }: { ongoingTimers: Timer[] }) => {
	const [timers, setTimers] = useState<Timer[]>(ongoingTimers)

	return (
		<div>
			{timers.length > 0 ? <div>
				<p className="text-sm opacity-60">Ongoing timers</p>
			</div> : timers.length === 0 && <TimersEmpty />}
			{timers.length > 0 ? <TimerListWithLoading
				timers={timers}
				setTimers={setTimers}
				className={cn('mt-4', timers.length === 0 && 'hidden')}
				supabaseSubscribeConfig={{
					event: '*',
					schema: 'public',
					table: 'timer',
				}}
				channelName="TimerList:Ongoing"
				filter={(timer) => timer.ended_at === null}
			/> : <TimerListWithoutLoading
				timers={timers}
				setTimers={setTimers}
				className={cn(timers.length === 0 && 'hidden')}
				supabaseSubscribeConfig={{
					event: '*',
					schema: 'public',
					table: 'timer',
				}}
				channelName="TimerList:Ongoing"
				filter={(timer) => timer.ended_at === null}
			/>}
		</div>
	)
}

export default OngoingTimerList
