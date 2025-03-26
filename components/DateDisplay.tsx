'use client'

import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { getCurrentUnixTimestamp } from '@/lib/utils'

const DateDisplay = () => {
	const [formattedDate, setFormattedDate] = useState<string>('')

	useEffect(() => {
		setFormattedDate(DateTime.fromMillis(getCurrentUnixTimestamp()).toFormat('LLL dd\', \'EEEE'))
	}, [])

	return (
		<p className="text-sm opacity-60">
			{formattedDate}
		</p>
	)
}

export default DateDisplay 