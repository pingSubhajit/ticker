'use server'

import {createClient} from '@/utils/supabase/server'
import {Timer} from '@/components/TimerList'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {getCurrentPSTUnixTimestamp} from '@/lib/utils'

export const createTimer = async (name?: string, timestamp?: number) => {
	const supabase = createClient()

	const { data: timer, error } = await supabase
		.from('timer')
		.insert({
			name: name || 'Unnamed timer',
			started_at: timestamp || getCurrentPSTUnixTimestamp()
		}).select().single()

	if (error) {
		throw new Error(error.message || 'Could not create timer')
	}

	revalidatePath('/app')
	return timer as Timer
}

export const updateName = async (timerId: number, name: string) => {
	const supabase = createClient()

	const { data: timer, error } = await supabase
		.from('timer')
		.update({
			name
		}).eq('id', timerId).select().single()

	if (error) {
		throw new Error(error.message || 'Could not rename timer')
	}

	revalidatePath('/app')
	revalidatePath(`/app/timer/${timerId}`)

	return timer as Timer
}

export const stopTimer = async (timerId: number, timestamp?: number) => {
	const supabase = createClient()

	const { data: timer, error } = await supabase
		.from('timer')
		.update({
			ended_at: timestamp || getCurrentPSTUnixTimestamp()
		}).eq('id', timerId).select().single()

	if (error) {
		throw new Error(error.message || 'Could not stop timer')
	}

	revalidatePath('/app')
	revalidatePath(`/app/timer/${timerId}`)

	return timer as Timer
}

export const restartTimer = async (timerId: number, timestamp?: number) => {
	const supabase = createClient()

	const { data: timer, error } = await supabase
		.from('timer')
		.update({
			started_at: timestamp || getCurrentPSTUnixTimestamp(),
			ended_at: null
		}).eq('id', timerId).select().single()

	if (error) {
		throw new Error(error.message || 'Could not restart timer')
	}

	revalidatePath('/app')
	revalidatePath(`/app/timer/${timerId}`)

	return timer as Timer
}

export const deleteTimer = async (timerId: number, withRedirect=true) => {
	const supabase = createClient()

	const { data: timer, error } = await supabase
		.from('timer')
		.delete().eq('id', timerId).select().single()

	if (error) {
		throw new Error(error.message || 'Could not delete timer')
	}

	withRedirect && redirect('/app')

	return timer as Timer
}
