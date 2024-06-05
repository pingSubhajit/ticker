'use client'

import {Plus} from 'lucide-react'
import Button from '@/components/Button'
import {cn} from '@/lib/utils'
import {useState} from 'react'
import CreateTimerDialog from '@/components/dialogs/CreateTimerDialog'

const NewTimerButton = ({ className }: { className?: string }) => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

	return (
		<>
			<Button size="icon" className={cn('p-6', className)} onClick={() => setIsCreateDialogOpen(true)}>
				<Plus className="fill-neutral-950 w-6 h-6" strokeWidth={3} />
			</Button>

			<CreateTimerDialog open={isCreateDialogOpen} setOpen={setIsCreateDialogOpen} />
		</>
	)
}

export default NewTimerButton
