'use client'

import {useEffect, useState} from 'react'
import {Breakdown, cn, getInitialBreakdown} from '@/lib/utils'
import {Pause, Play, Square} from 'lucide-react'
import {DateTime} from 'luxon'
import Button from '@/components/Button'

export type Pause = {
	pauseId: number
	pausedAt: number
	resumedAt?: number
}

interface CounterProps {
	initialTime: number,
	variant?: 'base' | 'list',
	ended?: boolean,
	name?: string
}

const Counter = ({ initialTime, variant='base', ended=false, name }: CounterProps) => {
	const startDate = DateTime.fromMillis(initialTime).toFormat('LLL dd\', \'HH:mm')
	const [time, setTime] = useState(Date.now())
	const [breakdown, setBreakdown] = useState<Breakdown>(getInitialBreakdown(initialTime))
	const [pauses, setPauses] = useState<Pause[]>([])
	const [isRunning, setIsRunning] = useState(true)

	const pauseCounting = () => {
		const pauseId = pauses.length + 1
		const pausedAt = Date.now()
		setPauses([...pauses, { pauseId, pausedAt }])
		setIsRunning(false)
	}

	const resumeCounting = () => {
		const resumedAt = Date.now()
		const latestPause = pauses[pauses.length - 1]
		latestPause.resumedAt = resumedAt
		const updatedPauses = pauses.map(pause => pause.pauseId === latestPause.pauseId ? latestPause : pause)
		setPauses(updatedPauses)
		setIsRunning(true)
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (!isRunning || ended) return
			setTime(prevTime => {
				const currentTime = prevTime + 100
				const seconds = Math.floor((currentTime - initialTime) / 1000)
				const minutes = Math.floor(seconds / 60)
				const hours = Math.floor(minutes / 60)
				const days = Math.floor(hours / 24)
				setBreakdown({ hours, minutes, seconds, days })
				return currentTime
			})
		}, 100) // Updating time every 100 milliseconds
		return () => clearInterval(intervalId) // Cleanup function to clear the interval when component unmounts
	}, [isRunning]) // Empty dependency array ensures the effect runs only once when component mounts

	useEffect(() => {
		const continueCounterOnFocusIn = () => {
			if (document.visibilityState == 'visible' && isRunning) {
				setTime(Date.now())
			}
		}

		document.addEventListener('visibilitychange', continueCounterOnFocusIn)

		return () => {document.removeEventListener('visibilitychange', continueCounterOnFocusIn)}
	}, [isRunning])

	return (
		variant === 'base' ? (
			<div>
				{breakdown.days > 0 && <p className="font-medium text-3xl text-center">{breakdown.days} days &</p>}
				<div
					className={cn('flex items-end justify-center relative', breakdown.hours !== 0 && 'text-yellow-400')}>
					<p className="text-center text-9xl">
						{breakdown.hours.toString().padStart(2, '0')}
					</p>
					<p className="absolute -right-2 font-medium pb-4 translate-x-4">h</p>
				</div>
				<div
					className={cn('flex items-end justify-center relative', breakdown.hours === 0 && breakdown.minutes !== 0 && 'text-yellow-400')}>
					<p className="text-center text-9xl">
						{(breakdown.minutes % 60).toString().padStart(2, '0')}
					</p>
					<p className="absolute -right-2 font-medium pb-4 translate-x-4">m</p>
				</div>
				<div
					className={cn('flex items-end justify-center relative', breakdown.hours === 0 && breakdown.minutes === 0 && 'text-yellow-400')}>
					<p className="text-center text-9xl">
						{(breakdown.seconds % 60).toString().padStart(2, '0')}
					</p>
					<p className="absolute -right-2 font-medium pb-4 translate-x-4">s</p>
				</div>

				<div className="flex items-center mt-8 gap-2">
					<button className="bg-yellow-400 text-transparent p-12 rounded-2xl hover:bg-yellow-500 transition">
						<Square className="fill-neutral-950 w-8 h-8"/>
					</button>

					{isRunning && <Button onClick={pauseCounting} size="icon">
						<Pause className="fill-neutral-950 w-8 h-8"/>
					</Button>}

					{!isRunning && <Button onClick={resumeCounting} size="icon">
						<Play className="fill-neutral-950 w-8 h-8"/>
					</Button>}
				</div>
			</div>
		) : (
			<div className="flex items-center w-full rounded-3xl p-6 bg-neutral-50/5">
				<p className="w-1/3 text-left truncate opacity-60 font-sans">{name}</p>

				<p className="w-1/3 text-center">
					<span className={cn(breakdown.hours !== 0 && 'text-yellow-400')}>
						{breakdown.hours.toString().padStart(2, '0')}
					</span> &nbsp;: &nbsp;
					<span className={cn(breakdown.hours === 0 && breakdown.minutes !== 0 && 'text-yellow-400')}>
						{(breakdown.minutes % 60).toString().padStart(2, '0')}
					</span> &nbsp;: &nbsp;
					<span className={cn(breakdown.hours === 0 && breakdown.minutes === 0 && 'text-yellow-400')}>
						{(breakdown.seconds % 60).toString().padStart(2, '0')}
					</span>
				</p>

				<p className="w-1/3 text-right opacity-60 font-sans">{breakdown.days}d ago</p>
			</div>
		)
	)
}

export default Counter

export const CounterLoading = ({ variant='base' }: { variant?: 'base' | 'list' }) => {
	return (
		variant === 'base' ? (
			<div>

			</div>
		) : (
			<div className="flex items-center animate-pulse w-full rounded-3xl bg-neutral-50/5 h-[72px]" />
		)
	)
}