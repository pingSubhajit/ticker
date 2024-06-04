import Counter from '@/components/Counter'

export default function Home() {
	const initialTime = Date.now()

	return (
		<main className="flex min-h-svh flex-col items-center justify-center p-24 gap-8">
			<Counter initialTime={initialTime} />
		</main>
	)
}
