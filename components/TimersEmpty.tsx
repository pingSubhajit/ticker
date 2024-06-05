'use client'

import Button from '@/components/Button'
import {useCreateDialog} from '@/components/providers/dialog-provider'

const TimersEmpty = () => {
	const {setIsCreateDialogOpen} = useCreateDialog()
	
	return (
		<div className="mx-auto flex flex-col items-center justify-center px-4 gap-4">
			<h4 className="text-2xl">No timers here yet</h4>
			<p className="text-sm opacity-60  text-center text-balance">
				All good things start with a timer. Create one to get started. Your timers are synced and accessible from everywhere.
			</p>
			<Button variant="secondary" onClick={() => setIsCreateDialogOpen(true)}>Create timer</Button>
		</div>
	)
}

export default TimersEmpty
