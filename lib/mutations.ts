'use server'

import {createClient} from '@/utils/supabase/server'
import {Timer} from '@/components/TimerList'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'

export const createTimer = async (name?: string) => {
	const supabase = createClient()

	const { data: timer, error } = await supabase
		.from('timer')
		.insert({
			name: name || 'Unnamed timer',
			started_at: Date.now()
		}).select().single()

	if (error) {
		throw new Error(error.message || 'Could not create timer')
	}

	revalidatePath('/app')
	return timer as Timer
}

export const stopTimer = async (timerId: number) => {
	const supabase = createClient()

	const { data: timer, error } = await supabase
		.from('timer')
		.update({
			ended_at: Date.now()
		}).eq('id', timerId).select().single()

	if (error) {
		throw new Error(error.message || 'Could not stop timer')
	}

	revalidatePath('/app')
	revalidatePath(`/app/timer/${timerId}`)

	return timer as Timer
}

export const restartTimer = async (timerId: number) => {
	const supabase = createClient()

	const { data: timer, error } = await supabase
		.from('timer')
		.update({
			started_at: Date.now(),
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
