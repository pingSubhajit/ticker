import dynamic from 'next/dynamic'
import {CounterLoading} from '@/components/Counter'
import {createClient} from '@/utils/supabase/server'
import {notFound} from 'next/navigation'
import AppHeader from '@/components/AppHeader'
import {Timer} from '@/components/TimerList'
import {getInitialBreakdown} from '@/lib/utils'
import {Metadata, ResolvingMetadata} from 'next'
import WaveDecoration from '@/components/WaveDecoration'

const Counter = dynamic(() => import('@/components/Counter'), {ssr: false, loading: () => <CounterLoading />})

export async function generateMetadata(
	{ params }: { params: { timerId: string } }, parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const timerId = params.timerId

	// fetch data
	const supabase = createClient()
	const {data: timer, error} = await supabase.from('timer').select().eq('id', timerId).single() as unknown as {
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

const SingleTimer = async ({ params: { timerId } }: { params: { timerId: number } }) => {
	const supabase = createClient()
	const {data: timer, error} = await supabase.from('timer').select().eq('id', timerId).single() as unknown as {data: Timer, error: any}
	const {data: { user }} = await supabase.auth.getUser()

	return (
		<main className="flex flex-col justify-between gap-8">
			<AppHeader
				title={timer.name || `Timer no. ${timer.id}`}
				profileUrl={user!.user_metadata.avatar_url}
				backLink="/app"
			/>

			<Counter initialTimer={timer} />

			<p className="text-center opacity-60 font-sans">Started {getInitialBreakdown(timer.started_at).days}d ago</p>

			<WaveDecoration />
		</main>
	)
}

export default SingleTimer
