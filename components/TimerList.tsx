'use client'

import {CounterLoading, Pause} from '@/components/Counter'
import dynamic from 'next/dynamic'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {startTransition, useEffect, useOptimistic, useState} from 'react'

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

const TimerList = ({ initialTimers, className }: { initialTimers?: Timer[], className?: string }) => {
	const [timers, setTimers] = useState(initialTimers)
	const [optimisticTimers, setOptimisticTimers] = useOptimistic(
		timers,
		(_, newTimers: Timer[]) => newTimers
	)

	useEffect(() => {
		setTimers(initialTimers)
		startTransition(() => {
			setOptimisticTimers(initialTimers || [])
		})
	}, [initialTimers])

	const onDelete = async (id: number, next: () => Promise<void>) => {
		const newTimers = optimisticTimers!.filter((timer) => timer.id !== id)
		startTransition(() => {
			setOptimisticTimers(newTimers)
		})

		await next()
		setTimers(newTimers)
	}

	return (
		<ul className={cn('w-full flex flex-col gap-3', className)} role="list">
			{optimisticTimers?.map((timer) => (
				<Link href={`/app/timer/${timer.id}`} key={timer.id}>
					<Counter
						initialTime={timer.started_at}
						variant="list"
						name={timer.name}
						endedAt={timer.ended_at}
						id={timer.id}
						onDelete={onDelete}
					/>
				</Link>
			))}
		</ul>
	)
}

export default TimerList

