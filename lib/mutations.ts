'use server'

import {createClient} from '@/utils/supabase/server'
import {Timer} from '@/components/TimerList'
import {revalidatePath} from 'next/cache'

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
