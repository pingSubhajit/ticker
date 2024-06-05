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

// Initial breakdown
export const getInitialBreakdown = (initialTime: number, endedAt?: number) => {
	const seconds = Math.floor(((endedAt || getCurrentPSTUnixTimestamp()) - initialTime) / 1000)
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

export const getCurrentPSTUnixTimestamp = () => {
	const date = new Date()
	const timezoneOffset = date.getTimezoneOffset()
	const pstOffset = -480 // this is the offset for the Pacific Standard Time timezone
	// Get UNIX timestamp in milliseconds and adjust for the timezone offset
	const adjustedTime = new Date(date.getTime() + (timezoneOffset + pstOffset) * 60000)
	return adjustedTime.getTime()
}
