'use client'

import { useEffect, useState } from 'react'
import { getInitialBreakdown } from '@/lib/utils'

interface TimerAgeDisplayProps {
  startedAt: number
}

const TimerAgeDisplay = ({ startedAt }: TimerAgeDisplayProps) => {
	const [daysAgo, setDaysAgo] = useState<string>('')

	useEffect(() => {
		const days = getInitialBreakdown(startedAt).days
		setDaysAgo(`${days}d ago`)
	}, [startedAt])

	return (
		<p className="text-center opacity-60 font-sans">
			{daysAgo ? `Started ${daysAgo}` : ''}
		</p>
	)
}

export default TimerAgeDisplay 