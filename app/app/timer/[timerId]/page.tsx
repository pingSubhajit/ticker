import {createClient} from '@/utils/supabase/server'
import {notFound} from 'next/navigation'
import AppHeader from '@/components/AppHeader'
import {Timer} from '@/components/TimerList'
import {getInitialBreakdown} from '@/lib/utils'
import {Metadata} from 'next'
import WaveDecoration from '@/components/WaveDecoration'
import PageTimer from '@/app/app/timer/[timerId]/PageTimer'

export async function generateMetadata({ params }: { params: Promise<{ timerId: string }> }): Promise<Metadata> {
	// read route params
	const {timerId} = await params

	// fetch data
	const supabase = await createClient()
	const {data: timer} = await supabase.from('timer').select().eq('id', timerId).single() as unknown as {
		data: Timer,
		error: any
	}

	if (!timer) {
		notFound()
	}

	return {
		title: timer.name || `Timer no. ${timer.id}`,
		description: `Timer no. ${timer.id} started ${getInitialBreakdown(timer.started_at).days} days ago. See your 
		timer live. Manage your timers with easily.`,
	}
}

const SingleTimer = async ({ params }: { params: Promise<{ timerId: string }> }) => {
	const { timerId } = await params
	const supabase = await createClient()
	const {data: timer} = await supabase.from('timer').select().eq('id', timerId).single() as unknown as {data: Timer, error: any}
	const {data: { user }} = await supabase.auth.getUser()

	return (
		<main className="flex flex-col justify-between gap-8">
			<AppHeader
				title={timer.name || `Timer no. ${timer.id}`}
				profileUrl={user!.user_metadata.avatar_url}
				backLink="/app"
			/>

			<PageTimer initialTimer={timer} />

			<p className="text-center opacity-60 font-sans">Started {getInitialBreakdown(timer.started_at).days}d ago</p>

			<WaveDecoration />
		</main>
	)
}

export default SingleTimer
