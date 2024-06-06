'use client'

import TimerList, {Timer} from '@/components/TimerList'

const OldTimerList = ({ oldTimers }: { oldTimers: Timer[] }) => {
	return (
		<TimerList
			initialTimers={oldTimers}
			className="mt-4"
			supabaseSubscribeConfig={{
				event: '*',
				schema: 'public',
				table: 'timer',
			}}
			channelName="TimerList:Old"
			filter={(timer) => timer.ended_at !== null}
		/>
	)
}

export default OldTimerList