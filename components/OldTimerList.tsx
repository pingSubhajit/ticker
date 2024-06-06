'use client'

import TimerList, {Timer} from '@/components/TimerList'
import {useState} from 'react'
import Separator from '@/components/Separator'

const OldTimerList = ({ oldTimers }: { oldTimers: Timer[] }) => {
	const [timers, setTimers] = useState<Timer[]>(oldTimers)

	return (
		timers.length > 0 ? <>
			<Separator />

			<div>
				<p className="text-sm opacity-60">Old timers</p>
				<TimerList
					timers={timers}
					setTimers={setTimers}
					className="mt-4"
					supabaseSubscribeConfig={{
						event: '*',
						schema: 'public',
						table: 'timer',
					}}
					channelName="TimerList:Old"
					filter={(timer) => timer.ended_at !== null}
				/>
			</div>
		</> : ''
	)
}

export default OldTimerList