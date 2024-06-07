'use client'

import {CounterLoading, Pause} from '@/components/Counter'
import dynamic from 'next/dynamic'
import {cn} from '@/lib/utils'
import {Dispatch, SetStateAction, startTransition, useEffect} from 'react'
import {createClient} from '@/utils/supabase/client'
import {
	REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
	RealtimePostgresChangesFilter
} from '@supabase/realtime-js/src/RealtimeChannel'

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

interface TimerListProps {
	timers: Timer[],
	setTimers: Dispatch<SetStateAction<Timer[]>>,
	supabaseSubscribeConfig: Record<string, string>,
	filter: (timer: Timer) => boolean,
	channelName: string,
	className?: string
}

const TimerList = ({ timers, setTimers, supabaseSubscribeConfig, channelName, filter, className }: TimerListProps) => {
	const onDelete = async (id: number, next: () => Promise<void>) => {
		await next()
	}

	const supabase = createClient()

	useEffect(() => {
		const channel = supabase
			.channel(channelName)
			.on(
				'postgres_changes',
				supabaseSubscribeConfig as RealtimePostgresChangesFilter<`${REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL}`>,
				(payload) => {
					switch (payload.eventType) {
					case 'INSERT':
						if (!filter(payload.new as Timer)) return
						startTransition(() => {
							setTimers((prevTimers) => [payload.new as Timer, ...prevTimers] as Timer[])
						})
						break

					case 'DELETE':
						startTransition(() => {
							setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== payload.old.id))
						})
						break

					case 'UPDATE':
						if (!filter(payload.new as Timer)) {
							return setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== payload.old.id))
						}

						startTransition(() => {
							setTimers((prevTimers) => {
								if (prevTimers.find((timer) => timer.id === payload.new.id)) {
									return prevTimers.map((timer) => timer.id === payload.new.id ? payload.new as Timer : timer)
								} else {
									return [payload.new as Timer, ...prevTimers]
								}
							})
						})
						break
					}
				}
			)
			.subscribe()

		return () => {
			channel.unsubscribe
		}
	}, [])

	return (
		<ul className={cn('w-full flex flex-col gap-3', className)} role="list">
			{timers?.map((timer) => (
				<Counter
					key={timer.id}
					initialTimer={timer}
					variant="list"
					onDelete={onDelete}
				/>
			))}
		</ul>
	)
}

export default TimerList

