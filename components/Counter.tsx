'use client'

import { useState, useEffect } from 'react'
import {cn} from '@/lib/utils'
import {Pause, Play, Square} from 'lucide-react'

type Pause = {
	pauseId: number
	pausedAt: number
	resumedAt?: number
}

const Counter = ({ initialTime }: { initialTime: number }) => {
	const [time, setTime] = useState(initialTime)
	const [breakdown, setBreakdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
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
			if (!isRunning) return
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

	return (
		<div>
			{breakdown.days > 0 && <p className="font-medium text-3xl text-center">{breakdown.days} days &</p>}
			<div className={cn('flex items-end justify-center relative', breakdown.hours !== 0 && 'text-yellow-400')}>
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

				{isRunning && <button onClick={pauseCounting} className="bg-yellow-400 text-neutral-950 p-12 rounded-2xl hover:bg-yellow-500 transition">
					<Pause className="fill-neutral-950 w-8 h-8" />
				</button>}

				{!isRunning && <button onClick={resumeCounting} className="bg-yellow-400 text-neutral-950 p-12 rounded-2xl hover:bg-yellow-500 transition">
					<Play className="fill-neutral-950 w-8 h-8" />
				</button>}
			</div>
		</div>
	)
}

export default Counter