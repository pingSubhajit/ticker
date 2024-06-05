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
	const seconds = Math.floor(((endedAt || Date.now()) - initialTime) / 1000)
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