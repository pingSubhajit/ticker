import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Initial breakdown
export const getInitialBreakdown = (initialTime: number) => {
	const seconds = Math.floor((Date.now() - initialTime) / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)
	return { hours, minutes, seconds, days }
}

export type Breakdown = {
	days: number
	hours: number
	minutes: number
	seconds: number
}