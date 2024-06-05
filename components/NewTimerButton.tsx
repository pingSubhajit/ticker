'use client'

import {Plus} from 'lucide-react'
import Button from '@/components/Button'
import {cn} from '@/lib/utils'
import {useCreateDialog} from '@/components/providers/dialog-provider'

const NewTimerButton = ({ className }: { className?: string }) => {
	const {setIsCreateDialogOpen} = useCreateDialog()

	return (
		<>
			<Button size="icon" className={cn('p-6', className)} onClick={() => setIsCreateDialogOpen(true)}>
				<Plus className="fill-neutral-950 w-6 h-6" strokeWidth={3} />
			</Button>
		</>
	)
}

export default NewTimerButton
