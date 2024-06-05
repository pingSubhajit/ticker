import {CounterLoading, Pause} from '@/components/Counter'
import dynamic from 'next/dynamic'
import {cn} from '@/lib/utils'
import Link from 'next/link'

const Counter = dynamic(() => import('@/components/Counter'), {ssr: false, loading: () => <CounterLoading variant="list" />})

export type Timer = {
	id: number
	created_at: string
	name?: string
	started_at: number
	ended_at?: number
	pauses?: Pause[]
	user: string
}

const TimerList = ({ timers, className }: { timers: Timer[], className?: string }) => {
	return (
		<div className={cn('w-full flex flex-col gap-3', className)}>
			{timers.map((timer) => (
				<Link href={`/app/timer/${timer.id}`} key={timer.id}>
					<Counter
						initialTime={timer.started_at}
						variant="list"
						name={timer.name}
						endedAt={timer.ended_at}
					/>
				</Link>
			))}
		</div>
	)
}

export default TimerList

