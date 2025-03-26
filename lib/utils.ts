import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {z} from 'zod'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

const emptyStringToUndefined = z.literal('').transform(() => undefined)
export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
	return schema.optional().or(emptyStringToUndefined)
}

export type PauseRecord = {
  pausedAt: number
  resumedAt?: number
}

// Initial breakdown
export const getInitialBreakdown = (initialTime: number, endedAt?: number, pauses?: PauseRecord[]) => {
	let seconds = Math.floor(((endedAt || getCurrentUnixTimestamp()) - initialTime) / 1000)
	
	// Subtract pause durations
	if (pauses && pauses.length > 0) {
		const pauseDuration = pauses.reduce((total, pause) => {
			const pauseEnd = pause.resumedAt || getCurrentUnixTimestamp()
			return total + (pauseEnd - pause.pausedAt) / 1000
		}, 0)
		seconds -= Math.floor(pauseDuration)
	}
	
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

export const getCurrentUnixTimestamp = () => {
	return Date.now()
}
