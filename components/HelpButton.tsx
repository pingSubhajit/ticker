'use client'

import {useHelpDialog} from '@/components/providers/dialog-provider'
import {CircleHelp} from 'lucide-react'

const HelpButton = () => {
	const {setIsHelpDialogOpen} = useHelpDialog()

	return (
		<button
			className="items-center justify-center fixed bottom-8 right-8 p-2 hidden lg:flex opacity-60"
			onClick={() => setIsHelpDialogOpen(true)}
		>
			<span className="sr-only">Help</span>
			<CircleHelp className="w-6 h-6" aria-hidden />
		</button>
	)
}

export default HelpButton