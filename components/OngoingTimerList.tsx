'use client'

import TimerList, {Timer} from '@/components/TimerList'

const OngoingTimerList = ({ ongoingTimers }: { ongoingTimers: Timer[] }) => {
	return (
		<TimerList
			initialTimers={ongoingTimers}
			className="mt-4"
			supabaseSubscribeConfig={{
				event: '*',
				schema: 'public',
				table: 'timer',
			}}
			channelName="TimerList:Ongoing"
			filter={(timer) => timer.ended_at === null}
		/>
	)
}

export default OngoingTimerList
