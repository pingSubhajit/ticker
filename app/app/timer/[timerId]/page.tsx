import dynamic from 'next/dynamic'
import {CounterLoading} from '@/components/Counter'
import {createClient} from '@/utils/supabase/server'
import {notFound} from 'next/navigation'

const Counter = dynamic(() => import('@/components/Counter'), {ssr: false, loading: () => <CounterLoading />})

const SingleTimer = async ({ params: { timerId } }: { params: { timerId: number } }) => {
	const supabase = createClient()

	const {data: timer, error} = await supabase.from('timer').select().eq('id', timerId).single()

	if (!timer) {
		notFound()
	}

	return (
		<main className="flex flex-col items-center justify-center p-24 gap-8">
			<Counter initialTime={timer.started_at} name={timer.name} />
		</main>
	)
}

export default SingleTimer
