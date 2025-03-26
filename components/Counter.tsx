'use client'

import {useEffect, useState} from 'react'
import {Breakdown, cn, getCurrentUnixTimestamp, getInitialBreakdown} from '@/lib/utils'
import {LoaderCircle, Pause, Play, RotateCw, Square, Trash2} from 'lucide-react'
import Button from '@/components/Button'
import {deleteTimer, restartTimer, stopTimer} from '@/lib/mutations'
import {toast} from 'sonner'
import {useHotkeys} from '@mantine/hooks'
import {Timer} from '@/components/TimerList'
import {createClient} from '@/utils/supabase/client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

export type Pause = {
	pauseId: number
	pausedAt: number
	resumedAt?: number
}

interface CounterProps {
	initialTimer: Timer
	variant?: 'base' | 'list'
	onDelete?: (id: number, next: () => Promise<void>) => Promise<void>
}

const Counter = ({initialTimer, variant='base', onDelete }: CounterProps) => {
	const [timer, setTimer] = useState(initialTimer)
	const supabase = createClient()
	const route = usePathname()

	useEffect(() => {
		const channel = supabase
			.channel(`timer:${timer.id}:update`)
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'timer',
					filter: `id=eq.${timer.id}`,
				},
				(payload) => {
					switch (payload.eventType) {
					case 'UPDATE':
						setTimer(payload.new as Timer)
						break
					case 'DELETE':
						if (payload.old?.id === timer.id && route === `/app/timer/${timer.id}`) {
							toast.success(`Timer "${timer.name || `Timer no. ${timer.id}`}" deleted`)
							window.location.href = '/app'
						}
						break
					}
				}
			)
			.subscribe()

		return () => {
			channel.unsubscribe()
		}
	}, [supabase])

	const [breakdown] = useState<Breakdown>(getInitialBreakdown(timer.started_at, timer.ended_at))
	const [pauses, setPauses] = useState<Pause[]>([])
	const [isRunning, setIsRunning] = useState(true)
	const [loading, setLoading] = useState({
		restart: false,
		delete: false,
		stop: false
	})

	const removeTimer = async (withRedirect:boolean=true) => {
		setLoading({ ...loading, delete: true })
		const deleteTimerFunction = async () => {
			try {
				const deletedTimer = await deleteTimer(timer.id, withRedirect)
				toast.success(`Timer "${deletedTimer ? deletedTimer.name : `Timer no. ${timer.id}`}" deleted`)
			} catch (error: any) {
				toast.error('Could not delete timer')
			}
		}

		if (onDelete) {
			await onDelete(timer.id, deleteTimerFunction)
		} else {
			await deleteTimerFunction()
		}

		setLoading({ ...loading, delete: false })
	}

	const restartCounting = async () => {
		setLoading({ ...loading, restart: true })
		try {
			const restartedTimer = await restartTimer(timer.id, getCurrentUnixTimestamp())
			toast.success(`Timer "${restartedTimer.name}" restarted`)
		} catch (error: any) {
			toast.error('Could not restart timer')
		}
		setLoading({ ...loading, restart: false })
	}

	const stopCounting = async () => {
		setLoading({ ...loading, stop: true })
		try {
			const stoppedTimer = await stopTimer(timer.id, getCurrentUnixTimestamp())
			toast.success(`Timer "${stoppedTimer.name}" stopped`)
		} catch (error: any) {
			toast.error('Could not stop timer')
		}
		setLoading({ ...loading, stop: false })
	}

	const pauseCounting = () => {
		const pauseId = pauses.length + 1
		const pausedAt = getCurrentUnixTimestamp()
		setPauses([...pauses, { pauseId, pausedAt }])
		setIsRunning(false)
	}

	const resumeCounting = () => {
		const resumedAt = getCurrentUnixTimestamp()
		const latestPause = pauses[pauses.length - 1]
		latestPause.resumedAt = resumedAt
		const updatedPauses = pauses.map(pause => pause.pauseId === latestPause.pauseId ? latestPause : pause)
		setPauses(updatedPauses)
		setIsRunning(true)
	}

	// Starts the timer counting interval when the component mounts
	useEffect(() => {
		const intervalId = setInterval(() => {
			if (!isRunning || timer.ended_at) return
		}, 100) // Updating time every 100 milliseconds
		return () => clearInterval(intervalId) // Cleanup function to clear the interval when component unmounts
	}, [isRunning, timer.ended_at]) // Empty dependency array ensures the effect runs only once when component mounts

	useHotkeys([
		['s', () => variant === 'base' && !loading.stop && timer.id && !timer.ended_at && stopCounting()],
		['r', () => variant === 'base' && !loading.restart && timer.id && timer.ended_at && restartCounting()],
		['space', () => variant === 'base' ? isRunning ? pauseCounting() : resumeCounting() : ''],
		['k', () => variant === 'base' ? isRunning ? pauseCounting() : resumeCounting() : ''],
		['p', () => variant === 'base' ? isRunning ? pauseCounting() : resumeCounting() : ''],
		['mod+backspace', () => variant === 'base' && !loading.delete && removeTimer(true)]
	])

	return (
		variant === 'base' ? (
			<div className="h-full">
				{breakdown.days > 0 && <p className="font-medium text-3xl text-center">{breakdown.days} days &</p>}
				<div
					className={cn('flex items-end justify-center relative', breakdown.hours !== 0 && 'text-yellow-400')}>
					<p className="text-center text-9xl">
						{(breakdown.hours % 24).toString().padStart(2, '0')}
					</p>
					<p className="absolute right-16 font-medium pb-4 translate-x-4">h</p>
				</div>
				<div
					className={cn('flex items-end justify-center relative', breakdown.hours === 0 && breakdown.minutes !== 0 && 'text-yellow-400')}>
					<p className="text-center text-9xl">
						{(breakdown.minutes % 60).toString().padStart(2, '0')}
					</p>
					<p className="absolute right-16 font-medium pb-4 translate-x-4">m</p>
				</div>
				<div
					className={cn('flex items-end justify-center relative', breakdown.hours === 0 && breakdown.minutes === 0 && 'text-yellow-400')}>
					<p className="text-center text-9xl">
						{(breakdown.seconds % 60).toString().padStart(2, '0')}
					</p>
					<p className="absolute right-16 font-medium pb-4 translate-x-4">s</p>
				</div>

				<div className="flex items-center mt-8 gap-2 justify-center">
					{timer.id && !timer.ended_at &&
						<Button size="icon" onClick={stopCounting} variant="secondary" disabled={loading.stop}>
							<span className="sr-only">Stop</span>
							{loading.stop && <LoaderCircle className="w-8 h-8 animate-spin" aria-hidden />}
							{!loading.stop && <Square className="fill-yellow-400 w-8 h-8" aria-hidden />}
						</Button>
					}

					{timer.id && timer.ended_at &&
                        <Button size="icon" onClick={restartCounting} disabled={loading.restart}>
                        	<span className="sr-only">Restart</span>
                        	{loading.restart && <LoaderCircle className="w-8 h-8 animate-spin" aria-hidden />}
                        	{!loading.restart && <RotateCw className="w-8 h-8" strokeWidth={3} aria-hidden />}
                        </Button>
					}

					{timer.id && timer.ended_at &&
                        <Button size="icon" onClick={() => removeTimer(true)} variant="secondary" disabled={loading.delete}>
                        	<span className="sr-only">Delete</span>
                        	{loading.delete && <LoaderCircle className="w-8 h-8 animate-spin" aria-hidden />}
                        	{!loading.delete && <Trash2 className="w-8 h-8" strokeWidth={3} aria-hidden />}
                        </Button>
					}

					{isRunning && !timer.ended_at && <Button onClick={pauseCounting} size="icon">
						<span className="sr-only">Pause</span>
						<Pause className="fill-neutral-950 w-8 h-8" aria-hidden />
					</Button>}

					{!isRunning && !timer.ended_at && <Button onClick={resumeCounting} size="icon">
						<span className="sr-only">Play</span>
						<Play className="fill-neutral-950 w-8 h-8" aria-hidden />
					</Button>}
				</div>
			</div>
		) : (
			<li role="listitem">
				<Link
					href={`/app/timer/${timer.id}`}
					className="flex items-center gap-1.5 w-full rounded-3xl p-6 bg-neutral-50/5 relative overflow-x-hidden group hover-hover:hover:bg-neutral-200/10
					transition"
					onKeyUp={(event) => {
						// delete timer on backspace or delete
						if (event.key === 'Backspace' || event.key === 'Delete') {
							removeTimer()
						}
					}}
				>
					<p className="w-1/3 text-left truncate opacity-60 font-sans">{timer.name}</p>

					<p className="w-1/3 text-center whitespace-nowrap">
						{breakdown.days > 0 && <>
							<span className={cn(breakdown.days !== 0 && 'text-yellow-400')}>
								{breakdown.days}
							</span> &nbsp;: &nbsp;
						</>}
						<span className={cn(breakdown.days === 0 && breakdown.hours !== 0 && 'text-yellow-400')}>
							{(breakdown.hours % 24).toString().padStart(2, '0')}
						</span> &nbsp;: &nbsp;
						<span className={cn(breakdown.hours === 0 && breakdown.minutes !== 0 && 'text-yellow-400')}>
							{(breakdown.minutes % 60).toString().padStart(2, '0')}
						</span> &nbsp;: &nbsp;
						<span className={cn(breakdown.hours === 0 && breakdown.minutes === 0 && 'text-yellow-400')}>
							{(breakdown.seconds % 60).toString().padStart(2, '0')}
						</span>
					</p>

					<p className="w-1/3 text-right opacity-60 font-sans">{breakdown.days}d ago</p>

					<Button
						size="icon"
						className="absolute top-0 bottom-0 h-full right-0 translate-x-[100%]
						hover-hover:group-hover:translate-x-0 group-focus-visible:translate-x-0 aspect-square !p-0 flex
						items-center justify-center rounded-none" tabIndex={-1}
						disabled={loading.delete}
						onClick={(event) => {
							if (!loading.delete) {
								event.stopPropagation()
								event.nativeEvent.stopImmediatePropagation()
								event.preventDefault()
								removeTimer(false)
							}
						}}
					>
						<span className="sr-only">Delete</span>
						{loading.delete && <LoaderCircle className="w-8 h-8 animate-spin" aria-hidden />}
						{!loading.delete && <Trash2 className="w-6 h-6" strokeWidth={2} aria-hidden/>}
					</Button>
				</Link>
			</li>
		)
	)
}

export default Counter

export const CounterLoading = ({variant = 'base'}: { variant?: 'base' | 'list' }) => {
	return (
		variant === 'base' ? (
			<div>

			</div>
		) : (
			<div className="flex items-center animate-pulse w-full rounded-3xl bg-neutral-50/5 h-[72px]"/>
		)
	)
}