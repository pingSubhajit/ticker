import Counter from '@/components/Counter'

const SingleTimer = () => {
	const initialTime = Date.now()

	return (
		<main className="flex min-h-svh flex-col items-center justify-center p-24 gap-8">
			<Counter initialTime={initialTime}/>
		</main>
	)
}

export default SingleTimer
