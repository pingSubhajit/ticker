'use client'

import dynamic from 'next/dynamic'
import {CounterLoading} from '@/components/Counter'
import {Timer} from '@/components/TimerList'

const Counter = dynamic(() => import('@/components/Counter'), {ssr: false, loading: () => <CounterLoading />})

const PageTimer = ({initialTimer}: {initialTimer: Timer}) => {
	return (
		<>
			<Counter initialTimer={initialTimer} />
		</>
	)
}

export default PageTimer
